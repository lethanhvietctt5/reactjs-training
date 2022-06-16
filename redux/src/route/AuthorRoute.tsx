import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import api from "../service";

type Props = {
  redirectPath: string;
};

function AuthorRoute({ redirectPath }: Props) {
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const { post_id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      const res = await api.get(`/posts/${post_id}`);
      setPost(res.data);
      setLoading(false);
    }

    fetchPost();
  }, [post_id]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (auth.id !== post?.author_id && !loading)
    return <Navigate to={redirectPath} replace />;
  return <Outlet />;
}

export default AuthorRoute;
