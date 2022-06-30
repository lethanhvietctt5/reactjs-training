export type Post = {
  id: string;
  author_id: string;
  author_name?: string;
  tags: string[];
  title: string;
  content: string;
  created_at: number;
  updated_at: number;
};
