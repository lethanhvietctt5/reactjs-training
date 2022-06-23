import api from "api";

const postApi = {
  getPostById: async (post_id: string) => {
    return await api.get("/posts/" + post_id);
  },
};

export default postApi;
