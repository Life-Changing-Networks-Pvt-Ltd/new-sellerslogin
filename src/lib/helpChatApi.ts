import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";

const BACKEND_URL = NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") || "";

const helpChatApi = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/help-chat`,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export type HelpChatQuestion = {
  id: string;
  label: string;
  answer: string;
};

export type HelpChatTopic = {
  id: string;
  label: string;
  type: "submenu" | "toast";
  toastMessage?: string;
  questions: HelpChatQuestion[];
};

export type HelpChatContent = {
  welcomeMessage: string;
  topics: HelpChatTopic[];
};

type HelpChatContentResponse = {
  success: boolean;
  data: HelpChatContent;
};

export const getHelpChatContent = async (): Promise<HelpChatContent> => {
  const response = await helpChatApi.get<HelpChatContentResponse>("/content");
  return response.data.data;
};
