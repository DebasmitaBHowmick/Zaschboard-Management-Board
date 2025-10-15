import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/config";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";
import { useState } from "react";
import { toast } from "react-toastify";


const Login = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // default role
  const [error] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Always check before accessing
      if (!user) {
        toast.error("No user found in response");
        return;
      }

      // Save role to localStorage for Firebase auth state listener
      localStorage.setItem('role', role);

      // Dispatch to Redux (onAuthStateChanged will also trigger, but this ensures immediate update)
      dispatch(
        setUser({
          user: {
            name: user.displayName || user.email,
            email: user.email || email,
            uid: user.uid,
          },
          role,
        })
      );

      toast.success(`Welcome ${user.displayName || user.email}`);
      
      if(role === "employee"){
        navigate("/emp-dashboard")
      }else{
        navigate("/mngr-dashboard")
      }
    } catch (error) {
      toast.error("Login Error:", error.message);
      toast.error("Login failed. Check your email and password.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
  <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8">
    <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Login</h2>
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" for="email">Email</label>
        <input id="email"  type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
         value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"  required/>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" for="password">Password</label>
        <input id="password" type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password" required/>
      </div>

      {/* Role Selection */}
          <div className="mb-6 flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input  type="radio" name="role" value="employee" checked={role === "employee"} onChange={(e) => setRole(e.target.value)}
              />
              <span className="text-gray-700">Employee</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="radio" name="role"  value="manager" checked={role === "manager"} onChange={(e) => setRole(e.target.value)}/>
              <span className="text-gray-700">Manager</span>
            </label>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold" >
        Login
      </button>
    </form>
  </div>
</div>

  )
}

export default Login
