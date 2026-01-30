import Logo from "../assests/logo.png";
import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  signOut } from "firebase/auth";
import { auth } from "../Firebase/config";
import { toast } from "react-toastify";
import { logout } from "../redux/authSlice";
import Hamburger from "./Hamburger";
import useTitle from './../hooks/useTitle';

const Header = () => {
useTitle('Home')
const [darkMode, setDarkMode] = useState( JSON.parse(localStorage.getItem("darkMode"))||false);

//toggling darkMode
useEffect(()=> {
  JSON.stringify(localStorage.setItem("darkMode", darkMode));
if (darkMode) {
  document.documentElement.classList.add('dark');
}else{
  document.documentElement.classList.remove('dark');
}
}, [darkMode]);

const activeClass = "text-base block py-3 px-4 rounded-lg text-white bg-blue-600";
const inActiveClass = "text-base block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white";

const [hidden, setHidden] = useState(true);

const {user} = useSelector((state) => state.auth)
const dispatch = useDispatch();
const navigate = useNavigate();

//user log-out
const handleLogOut = async () => {
  try {
    await signOut(auth);
    dispatch(logout());
    toast.info("Log out successfully");
    navigate("/");
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

const handleSignUp = (e) => {
    e.preventDefault();

    navigate("/register")
};

const handleLogin = (e) => {
  e.preventDefault();
  navigate("/login")
}

  return (
   <header>
     <nav
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl 
        bg-gradient-to-br from-[#7f93ce] via-[#96a5f3] to-[#6f82c8] 
        dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#020617] 
        border-b border-white/10 shadow-sm"
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} className="h-10" alt="ZaschBoard" />
            <span className="text-xl font-semibold text-white">
              ZaschBoard - Management Board
            </span>
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setHidden(!hidden)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/20 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-white font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-300" : "hover:text-blue-200"
              }
              end
            >
              Home
            </NavLink>

            <NavLink
              to="/mngr-dashboard"
              className={({ isActive }) => `${isActive ? activeClass : inActiveClass} flex items-center gap-1 hover:text-blue-900`}
            >
              Manager Portal
            </NavLink>

            <NavLink
              to="/emp-dashboard"
              className={({ isActive }) => `${isActive ? activeClass : inActiveClass} flex items-center gap-1 hover:text-blue-900`}
            >
              Employee Portal
            </NavLink>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className= {({ isActive }) => `${isActive ? activeClass : inActiveClass} flex items-center gap-1 hover:text-blue-900`}>
                Profile ▾
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white text-blue-700 rounded-xl shadow-xl overflow-hidden focus:outline-none">
                {user ? (
                  <>
                    <Menu.Item as="div">
                      <div className="px-4 py-3 text-sm border-b">
                        <div className="text-xs text-gray-500">Hi,</div>
                        <div className="font-semibold truncate">
                          {user?.name || user?.email}
                        </div>
                      </div>
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogOut}
                          className={`block w-full text-left px-4 py-3 ${
                            active ? "bg-gray-100 text-blue-900" : ""
                          }`}
                        >
                          Log out
                        </button>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogin}
                          className={`block w-full text-left px-4 py-3 ${
                            active ? "bg-gray-100 text-blue-900" : ""
                          }`}
                        >
                          Login
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleSignUp}
                          className={`block w-full text-left px-4 py-3 ${
                            active ? "bg-gray-100 text-blue-900" : ""
                          }`}
                        >
                          Sign Up
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Menu>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className= {`${darkMode ? " mt-3 text-center text-sm opacity-80 text-white cursor-pointer bi bi-moon-stars-fill" : "bi bi-sun-fill"}`}
            >
            
            </button>
          </div>
        </div>
      </nav>
    <Hamburger hidden={hidden}
        setHidden={setHidden}
         activeClass={activeClass}
        inActiveClass={inActiveClass}
        user={user}
        handleLogOut={handleLogOut}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        darkMode={darkMode}
        setDarkMode={setDarkMode} />
   </header>
  )
}

export default Header




// bi bi-moon-stars-fill" : "bi bi-sun-fill"
