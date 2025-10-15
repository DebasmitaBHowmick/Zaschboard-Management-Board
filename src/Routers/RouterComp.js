import { Route, Routes } from "react-router-dom"
import HomePage from './../pages/HomePage';
import PageNotFound from './../pages/PageNotFound';
import Register from "../SignUp/Register";
import Dashboard from "../pages/Dashboard";
import AddTasks from "../components/AddTasks";
import TaskList from "../components/TaskList";
import Login from './../SignUp/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const RouterComp = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route 
          path="/mngr-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <AddTasks/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/emp-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <TaskList/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element = {<PageNotFound/>}/>
      </Routes>
    </main>
  )
}

export default RouterComp
