import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth || {});

  const isAuthenticated = !!user; // true jika user ada dan bukan null/undefined

  return isAuthenticated ? children : <Navigate to="/pages/login" replace />;
};

export default PrivateRoute;
