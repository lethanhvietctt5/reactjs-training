import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Comment, Post, User } from "../../types";

type Props = {
  post?: Post;
  author?: User;
  comments: Comment[];
};

type Params = {
  postId: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  if (params) {
    const { postId } = params;
    let res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const post: Post = await res.json();

    res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const comments: Comment[] = await res.json();

    res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${post.userId}`
    );

    const author: User = await res.json();

    return {
      props: {
        post,
        comments,
        author,
      },
    };
  }
  return {
    props: {
      comments: [],
    },
  };
};

const Post: NextPage<Props> = ({ post, comments, author }) => {
  if (!!post) {
    <div>Post not found</div>;
  }

  return (
    <div className="mt-14">
      <div className="text-2xl mb-4 font-semibold">{post?.title}</div>
      <div className="mb-2">
        by <span className="text-blue-400">{author?.name}</span>
      </div>
      <div>{post?.body}</div>
      <div className="mt-6">
        <div className="mb-4">Comment ({comments.length})</div>
        <div>
          {comments.map((cmt) => (
            <div key={cmt.id} className="border-b px-6 py-2 last:border-b-0">
              <div className="font-medium">{cmt.name}</div>
              <div className="italic">{cmt.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
