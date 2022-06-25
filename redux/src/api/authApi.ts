import User from "types/user";
import api from ".";

const authApi = {
  login: async function (email: string, password: string): Promise<User | undefined> {
    const res = await api.get<User[]>(`/users?email=${email}&password=${password}`);
    return res.data.length > 0 ? res.data[0] : undefined;
  },
};

export default authApi;
