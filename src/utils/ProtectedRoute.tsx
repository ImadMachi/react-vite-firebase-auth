import Loader from "@components/Loader";
import useUser from "@hooks/useUser";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export { ProtectedRoute };
