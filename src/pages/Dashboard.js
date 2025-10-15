
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const {role} = useSelector(state => state.auth)
  
  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Please log in to access your dashboard.
      </div>
    );
  }

  // Redirect to appropriate dashboard based on role
  if (role === "manager") {
    return <Navigate to="/mngr-dashboard" replace />;
  } else if (role === "employee") {
    return <Navigate to="/emp-dashboard" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-600">
      Please log in to access your dashboard.
    </div>
  );
}

export default Dashboard
