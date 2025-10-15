import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useSelector((state) => state.auth);

  // If user is not logged in, redirect to login
  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  // If user's role is not in allowed roles, show toast and redirect
  if (!allowedRoles.includes(role)) {
    const requiredRole = allowedRoles.includes('manager') ? 'Manager' : 'Employee';
    toast.error(`Please login as ${requiredRole} to access this portal`, {
      position: "top-right",
      autoClose: 3000,
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
