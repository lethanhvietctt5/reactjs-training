import api from "api";

const userApi = {
  getBookmark: async (user_id: string) => {
    return await api.get("/bookmarks?user_id=" + user_id);
  },
  addBookmark: async (id: string, post_id: string) => {
    const res = await api.get("/bookmarks/" + id);
    const bookmark: string[] = res.data[0].list_bookmark;
    bookmark.push(post_id);
    return await api.put("/bookmarks/" + id, {
      list_bookmark: bookmark,
    });
  },
  removeBookmark: async (id: string, post_id: string) => {
    const res = await api.get("/bookmarks/" + id);
    let bookmark: string[] = res.data[0].list_bookmark;
    bookmark = bookmark.filter((item) => item !== post_id);
    return await api.put("/bookmarks/" + id, {
      list_bookmark: bookmark,
    });
  },
};

export default userApi;
