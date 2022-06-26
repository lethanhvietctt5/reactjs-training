import useAuthentication from "hooks/useAuthentication";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  redirectPath: string;
};

function ProtectdRoute({ redirectPath }: Props) {
  const { currentUser } = useAuthentication();

  if (!currentUser) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
}

export default ProtectdRoute;
