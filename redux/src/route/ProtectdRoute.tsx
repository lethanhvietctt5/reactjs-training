import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "hooks";

type Props = {
  redirectPath: string;
};

function ProtectdRoute({ redirectPath }: Props) {
  const auth = useAppSelector((state) => state.auth);

  if (!auth.currentUser.email) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
}

export default ProtectdRoute;
