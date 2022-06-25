import api from "api";
import Post from "types/post";

const postApi = {
  getPostById: async function (post_id: string): Promise<Post> {
    const res = await api.get<Post>("/posts/" + post_id);
    return res.data;
  },
  createPost: async function (post: Post): Promise<void> {
    await api.post("/posts", post);
  },
  getPosts: async function (limit?: number, page?: number): Promise<Post[]> {
    let url = "/posts";
    if (limit && page) {
      url += limit ? `?_limit=${limit}` : "";
      url += url + page ? `&_page=${page}` : "";
    }

    const res = await api.get<Post[]>(url);
    return res.data;
  },
};

export default postApi;
