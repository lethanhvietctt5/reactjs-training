import api from "api";
import User from "types/user";

const userApi = {
  getUserById: async function (user_id: string): Promise<User> {
    const res = await api.get<User>(`/users/${user_id}`);
    return res.data;
  },
};

export default userApi;
