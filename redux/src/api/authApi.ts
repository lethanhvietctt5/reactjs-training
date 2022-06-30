import { AuthResponse, User } from "types";
import api from ".";

export const authApi = {
  login: async function (email: string, password: string): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/login", { email, password });
    return res.data;
  },

  auth: async function (access_token: string, user_id: string): Promise<User> {
    const res = await api.post<User>("/auth", { user_id, access_token });
    return res.data;
  },
};
