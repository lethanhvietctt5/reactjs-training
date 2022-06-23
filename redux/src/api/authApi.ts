import api from ".";

const authApi = {
  login: async (email: string, password: string) => {
    return await api.get(`/users?email=${email}&password=${password}`);
  },
};

export default authApi;
