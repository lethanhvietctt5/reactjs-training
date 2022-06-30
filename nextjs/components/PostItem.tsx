import Link from "next/link";
import React from "react";
import { Post } from "../types";

type Props = {
  post: Post;
};

const PostItem: React.FC<Props> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="group border py-4 px-3 rounded-lg mb-4 hover:bg-blue-500 hover:scale-105 transition ease-in-out duration-300 cursor-pointer">
        <div className="text-2xl mb-2 font-medium group-hover:text-white">
          {post.title}
        </div>
        <div className="group-hover:text-white">{post.body}</div>
      </div>
    </Link>
  );
};

export default PostItem;
