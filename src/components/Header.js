import Logo from "../assests/logo.png"
import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  signOut } from "firebase/auth";
import { auth } from "../Firebase/config";
import { toast } from "react-toastify";
import { logout } from "../redux/authSlice";

const Header = () => {

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

const activeClass = "text-base block py-4 m-auto px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
const inActiveClass = "text-base block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-black-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

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
      
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={Logo} className="h-10 bg-blue-400" alt="e-cube" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ZaschBoard - Management Board</span>
    </Link>

    {/* For phone */}
    <button onClick={() => setHidden(!hidden)}data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    {/* For small vision */}
      <div className={`${hidden ? "hidden" : "block"} w-full md:hidden`} id="navbar-dropdown">
        <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    
                <li>
                  <NavLink to="/" className={({ isActive }) => `${isActive ? activeClass : inActiveClass}`} aria-current="page" end>Home</NavLink>
                </li>

                  <li>
              {/* <!-- Dropdown menu --> */}
                  <Menu as="div" className="relative">
                      <Menu.Button id="dropdownNavbarLink"   className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                    Profile <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"> <path stroke="currentColor" strokeLinecap="round"  strokeLinejoin="round" strokeWidth="2"  d="m1 1 4 4 4-4"/></svg>
                </Menu.Button>

            {/*All dropdown content goes here */}
            <Menu.Items className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 focus:outline-none">
              {user ? (
                <>
                <Menu.Item>
                  <li className="px-4 py-2 font-semibold text-gray-900 dark:text-white border-b dark:border-gray-600">
                  Hi, {user?.name || user?.email || "User"} 👋</li>
                </Menu.Item>
                  <Menu.Item>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={handleLogOut} className={`block w-full text-left px-4 py-2 ${active ? "bg-gray-100 dark:bg-blue-500 dark:text-white" : "" }`}>
                        Log out
                      </button> )}
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button className={`block w-full text-left px-4 py-2 ${active ? "bg-gray-100 dark:bg-gray-600 dark:text-white" : ""}`} >
                      Sign Up</button>)}
                </Menu.Item>
              )}
                </Menu.Items>
              </Menu>
        
        </li>
     
        <li>
          <NavLink to="/mngr-dashboard" className={({ isActive }) => `${isActive ? activeClass : inActiveClass}`}>Manager Portal</NavLink>
        </li>
        <li>
          <NavLink to="/emp-dashboard" className={({ isActive }) => `${isActive ? activeClass : inActiveClass}`}>Employee Portal</NavLink>
        </li>
          <button onClick={()=> setDarkMode(!darkMode)} className={`${darkMode ? "text-white cursor-pointer bi bi-moon-stars-fill" : "bi bi-sun-fill"}`}></button>
        </ul>
      </div>

    {/* For desktop */}
    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink to="/" className={({ isActive }) => `${isActive ? activeClass : inActiveClass}`} aria-current="page" end>Home</NavLink>
        </li>
        <li>
                   {/* <!-- Dropdown menu --> */}
        <Menu as="div" className="relative">
            <Menu.Button id="dropdownNavbarLink"   className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
          Profile <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"> <path stroke="currentColor" strokeLinecap="round"  strokeLinejoin="round" strokeWidth="2"  d="m1 1 4 4 4-4"/></svg>
      </Menu.Button>

  {/* ✨ All dropdown content goes here */}
  <Menu.Items className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 focus:outline-none">
    {user ? (
      <>
      <Menu.Item>
         <li className="px-4 py-2 font-semibold text-gray-900 dark:text-white border-b dark:border-gray-600">
        Hi, {user?.name || user?.email || "User"} 👋</li>
      </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button onClick={handleLogOut} className={`block w-full text-left px-4 py-2 ${active ? "bg-gray-100 dark:bg-blue-500 dark:text-white" : "" }`}>
              Log out
            </button> )}
        </Menu.Item>

      </>
    ) : (
      <><Menu.Item>
      {({ active }) => (
        <button onClick={handleSignUp}
        className={`block w-full text-left px-4 py-2 ${active ? "bg-gray-100 dark:bg-gray-600 dark:text-white" : ""}`}>
          Sign Up</button>)}
    </Menu.Item><Menu.Item>
        {({ active }) => (
          <button onClick={handleLogin}
          className={`block w-full text-left px-4 py-2 ${active ? "bg-gray-100 dark:bg-gray-600 dark:text-white" : ""}`}>
            Login </button>)}
     </Menu.Item></>                 
    )}
  </Menu.Items>
</Menu>
        </li>
     
        <li>
          <NavLink to="/mngr-dashboard" className={({ isActive }) => `${isActive ? activeClass : inActiveClass}`}>Manager Portal</NavLink>
        </li>
        <li>
          <NavLink to="/emp-dashboard" className={({ isActive }) => `${isActive ? activeClass : inActiveClass}`}>Employee Portal</NavLink>
        </li>

        <button onClick={()=> setDarkMode(!darkMode)} className={`${darkMode ? "text-white cursor-pointer bi bi-moon-stars-fill" : "bi bi-sun-fill"}`}></button>
      </ul>
    </div>
  </div>
</nav>
    </header>
  )
}

export default Header
