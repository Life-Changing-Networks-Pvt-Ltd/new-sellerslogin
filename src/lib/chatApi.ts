import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";

const BASE_URL = NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") || "";

const chatApi = axios.create({
  baseURL: `${BASE_URL}/api/v1/chat`,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export interface CreateChatResponse {
  success: boolean;
  data: {
    chatId: string;
    status: string;
    welcomeMessage: string;
    timerExpiresAt: string;
    responseTimeoutSeconds: number;
  };
  message?: string;
}

export interface ChatMessage {
  _id: string;
  chatId: string;
  senderType: "customer" | "admin" | "system";
  senderId?: string;
  text: string;
  createdAt: string;
}

export interface GetChatResponse {
  success: boolean;
  data: {
    chat: any;
    messages: ChatMessage[];
  };
}

export const createCustomerChat = async (payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<CreateChatResponse> => {
  const res = await chatApi.post("/customer/create", payload);
  return res.data;
};

export const getCustomerChat = async (chatId: string): Promise<GetChatResponse> => {
  const res = await chatApi.get(`/customer/${chatId}`);
  return res.data;
};

export const getSocketUrl = () => BASE_URL;
