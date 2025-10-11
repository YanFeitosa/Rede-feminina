import api, { setAccessToken } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
  phone?: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
  message?: string;
}

export interface ProfileResponse {
  success: boolean;
  data: User;
  message?: string;
}

export async function loginUser(data: { email: string; password: string }): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/api/auth/login", data);
  const token = res?.data?.accessToken;
  if (token) setAccessToken(token);
  return res;
}

export async function registerUser(data: { name: string; email: string; password: string; phone?: string; userType: string }): Promise<RegisterResponse> {
  const res = await api.post<RegisterResponse>("/api/auth/register", data);
  const token = res?.data?.accessToken;
  if (token) setAccessToken(token);
  return res;
}

export async function getUserProfile(): Promise<ProfileResponse> {
  return api.get<ProfileResponse>("/api/auth/profile");
}

export async function refreshToken(): Promise<{ accessToken: string }> {
  const res = await api.post<any>("/api/auth/refresh", {});
  const token = res?.data?.accessToken || res?.accessToken;
  if (token) setAccessToken(token);
  return { accessToken: token } as { accessToken: string };
}

export async function logoutUser(): Promise<void> {
  await api.post("/api/auth/logout", {});
  setAccessToken(null);
}
