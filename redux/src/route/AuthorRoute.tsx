import { postApi } from "api";
import { useAuthentication } from "hooks";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { Post } from "types";

type Props = {
  redirectPath: string;
};

function AuthorRoute({ redirectPath }: Props) {
  const { currentUser } = useAuthentication();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const { post_id } = useParams();

  useEffect(() => {
    if (post_id) {
      postApi.getPostById(post_id).then((post) => {
        setPost(post);
        setLoading(false);
      });
    }
  }, [post_id]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (currentUser && currentUser.id !== post?.author_id)
    return <Navigate to={redirectPath} replace />;
  return <Outlet />;
}

export default AuthorRoute;
