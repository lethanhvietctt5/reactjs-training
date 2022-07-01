import api from "api";
import { Bookmark } from "types";

export const bookmarkApi = {
  getBookmark: async function (user_id: string): Promise<Bookmark> {
    const res = await api.get<Bookmark[]>("/bookmarks?user_id=" + user_id);
    return res.data[0];
  },
  addBookmark: async function (bookmark_id: string, post_id: string): Promise<void> {
    const res = await api.get<Bookmark>("/bookmarks/" + bookmark_id);
    const collections: string[] = res.data.collections;
    collections.push(post_id);
    await api.put("/bookmarks/" + bookmark_id, {
      collections,
    });
  },
  removeBookmark: async function (id: string, post_id: string): Promise<void> {
    const res = await api.get("/bookmarks/" + id);
    let collections: string[] = res.data.collections;
    collections = collections.filter((item) => item !== post_id);
    await api.put("/bookmarks/" + id, {
      collections,
    });
  },
};
