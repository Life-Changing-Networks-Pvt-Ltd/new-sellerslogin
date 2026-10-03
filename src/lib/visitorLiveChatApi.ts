import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";

const BACKEND_URL = NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") || "";

const visitorLiveChatApi = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/live-chat`,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export type VisitorChatMessage = {
  _id: string;
  chatId: string;
  senderType: "visitor" | "admin" | "system";
  text: string;
  createdAt: string;
};

export type VisitorChatSession = {
  chatId: string;
  chatToken: string;
  status: string;
};

export const sendVisitorWhatsappOtp = async (whatsappNumber: string) => {
  const response = await visitorLiveChatApi.post("/whatsapp/send-otp", {
    whatsappNumber,
  });
  return response.data as {
    success: boolean;
    message: string;
    resendAfter: number;
    whatsappNumber: string;
  };
};

export const verifyVisitorWhatsappOtp = async (
  whatsappNumber: string,
  otp: string,
) => {
  const response = await visitorLiveChatApi.post("/whatsapp/verify-otp", {
    whatsappNumber,
    otp,
  });
  return response.data as {
    success: boolean;
    message: string;
    whatsappVerified: boolean;
    whatsappNumber: string;
    verificationToken: string;
  };
};

export const startVisitorLiveChat = async (payload: {
  name: string;
  email: string;
  whatsappNumber: string;
  message: string;
  queryType: "sales" | "support";
  whatsappVerificationToken: string;
}) => {
  const response = await visitorLiveChatApi.post("/start", payload);
  return response.data as {
    success: boolean;
    data: VisitorChatSession & {
      timerExpiresAt: string;
      responseTimeoutSeconds: number;
    };
  };
};

export const getVisitorLiveChatSession = async (chatToken: string) => {
  const response = await visitorLiveChatApi.get(`/session/${chatToken}`);
  return response.data as {
    success: boolean;
    data: {
      chat: {
        _id: string;
        status: string;
        resolutionStatus?: string;
      };
      messages: VisitorChatMessage[];
    };
  };
};

export const getVisitorLiveChatSocketUrl = () => BACKEND_URL;
