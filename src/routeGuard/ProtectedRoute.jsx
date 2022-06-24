import { Outlet, Navigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';

const ProtectedRoute = () => {
    const { user } = useContext(UserContext);

    return user ? <Outlet /> : <Navigate to='/' />;
};
export default ProtectedRoute;
