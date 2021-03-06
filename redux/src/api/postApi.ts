import api from "api";
import { nanoid } from "nanoid";
import { Post, User } from "types";

export const postApi = {
  getPostById: async function (post_id: string): Promise<Post> {
    const res = await api.get<Post>("/posts/" + post_id);
    return res.data;
  },

  createPost: async function (
    title: string,
    content: string,
    tags: string[],
    author: User
  ): Promise<void> {
    const newPost: Post = {
      id: nanoid(),
      author_id: author.id,
      title,
      content,
      tags,
      author_name: author.name,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    };
    await api.post("/posts", newPost);
  },

  editPost: async function (
    post: Post,
    title: string,
    content: string,
    tags: string[]
  ): Promise<void> {
    await api.put("posts/" + post.id, {
      id: post.id,
      author_id: post.author_id,
      title,
      content,
      tags,
      author_name: post.author_name,
      created_at: post.created_at,
      updated_at: new Date().getTime(),
    });
  },

  getPosts: async function (
    limit?: number,
    page?: number
  ): Promise<{ posts: Post[]; total: number }> {
    let url = "/posts";
    if (limit && page) {
      url += limit ? `?_limit=${limit}` : "";
      url += url + page ? `&_page=${page}` : "";
    }

    const res = await api.get<Post[]>(url);
    const totalRecord = parseInt(res.headers["x-total-count"]);
    return {
      posts: res.data,
      total: totalRecord ? totalRecord : 0,
    };
  },

  searchPosts: async function (keyword: string): Promise<Post[]> {
    const res = await api.get<Post[]>(`/posts?q=${keyword}`);
    return res.data;
  },

  deletePost: async function (postId: string): Promise<void> {
    await api.delete(`/posts/${postId}`);
  },
};
