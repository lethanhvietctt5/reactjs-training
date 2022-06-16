import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

type Props = {
  redirectPath: string;
};

function ProtectdRoute({ redirectPath }: Props) {
  const auth = useAppSelector((state) => state.auth);

  if (!auth.email) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
}

export default ProtectdRoute;
