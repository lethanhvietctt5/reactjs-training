type Post = {
  id: string;
  author_id: string;
  author_name: string | null;
  tags: string[];
  title: string;
  body: string;
  created_at: number;
  updated_at: number;
};

export default Post;
