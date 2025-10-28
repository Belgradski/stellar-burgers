import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const isAuthenticated = () => true;

export type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const isAuth = isAuthenticated();
  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
