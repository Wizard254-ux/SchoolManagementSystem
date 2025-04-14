import {JSX} from 'react';
import { Navigate,useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  let isAuthenticated = localStorage.getItem('isAuthorized') === 'true';
  const location=useLocation()
  if(location.pathname.startsWith('/apps/')){
     isAuthenticated=localStorage.getItem('hasAccount')=='true'
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
