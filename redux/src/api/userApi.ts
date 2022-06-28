import api from "api";
import { nanoid } from "nanoid";
import User from "types/user";

const userApi = {
  getUserById: async function (user_id: string): Promise<User> {
    const res = await api.get<User>(`/users/${user_id}`);
    return res.data;
  },

  register: async function (email: string, name: string, password: string): Promise<User> {
    const newUser: User = {
      id: nanoid(),
      email,
      name,
    };
    const res = await api.post<User>("/users", { ...newUser, password });
    return res.data;
  },
};

export default userApi;
