import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";


const Register = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("employee");

const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user

      // Update the user's display name
      await updateProfile(user, {
        displayName: name
      });

      // Save role to localStorage for Firebase auth state listener
      localStorage.setItem('role', role);

      dispatch(setUser({
        user: {
          name: name, // Use the name from form
          email: user.email || email,
          uid: user.uid,
        },
        role 
      }));

      toast.success(`Welcome ${name || email}`);

      if(role === "employee"){
        navigate("/emp-dashboard")
      }else{
        navigate("/mngr-dashboard")
      }
    } catch (error) {
      console.log(error)
      toast.error("Registration failed. Please try again.");
    }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
  <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8">
    <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Register</h2>
    <form onSubmit={handleRegister}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" for="name">Name</label>
        <input
          id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your name"
          required/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" for="email">Email</label>
        <input id="email" value ={email}type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" for="password">Password</label>
        <input  id="password" type="password"  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Enter your password" required
         value = {password} onChange={(e)=> setPassword(e.target.value)}/>
      </div>
      {/* Role Selection */}
          <div className="mb-6 flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input  type="radio"name="role" value="employee"
                checked={role === "employee"}
                onChange={(e) => setRole(e.target.value)} />
              <span className="text-gray-700">Employee</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="radio" name="role" value="manager" checked={role === "manager"} onChange={(e) => setRole(e.target.value)} />
              <span className="text-gray-700">Manager</span>
            </label>
          </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
        Register
      </button>
    </form>
  </div>
</div>

  )
}

export default Register
