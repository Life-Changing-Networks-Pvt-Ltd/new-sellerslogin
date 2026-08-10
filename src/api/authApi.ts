import api from "./axios";
export type BlogUser = { id: string; name: string; email: string };
export type AuthResponse = { token: string; user: BlogUser };
export const register = (payload: { name: string; email: string; password: string }) => api.post<AuthResponse>("/auth/register", payload).then((response) => response.data);
export const login = (payload: { email: string; password: string }) => api.post<AuthResponse>("/auth/login", payload).then((response) => response.data);
export const getMe = () => api.get<{ user: BlogUser }>("/auth/me").then((response) => response.data.user);
