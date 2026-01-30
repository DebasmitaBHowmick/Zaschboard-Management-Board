

import { Menu } from "@headlessui/react";
import { NavLink } from "react-router-dom";

const Hamburger = ({
  hidden,
  setHidden,
  activeClass,
  inActiveClass,
  user,
  handleLogOut,
  handleLogin,
  handleSignUp,
  darkMode,
  setDarkMode,
}) => {
  return (
    <div
      className={`${
        hidden ? "hidden" : "flex animate-slideDown"
      } fixed left-0 right-0 top-[72px] bottom-0 z-40 md:hidden 
      items-start justify-center pt-6 bg-black/30 backdrop-blur-sm`}
      onClick={() => setHidden(true)}
    >
      <ul
        className="w-[92%] max-w-sm flex flex-col font-medium p-4 
        border border-white/20 rounded-2xl 
        bg-white/95 dark:bg-gray-900/95 
        backdrop-blur-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <NavLink
          to="/"
          onClick={() => setHidden(true)}
          className={({ isActive }) =>
            isActive ? activeClass : inActiveClass
          } 
          end
        >
          Home
        </NavLink>

        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
            Profile
            <span>▾</span>
          </Menu.Button>

          <Menu.Items className="mt-2 w-full bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg overflow-hidden">
            {user ? (
              <>
                <Menu.Item as="div">
                  <div className="px-4 py-3 text-sm text-center border-b dark:border-gray-700">
                    <div className="text-xs opacity-70">Hi,</div>
                    <div className="font-semibold truncate">
                      {user?.name || user?.email || "User"}
                    </div>
                  </div>
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogOut}
                      className={`block w-full text-left px-4 py-3 ${
                        active ? "bg-gray-100 dark:bg-gray-700 dark:text-white" : ""
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
                        active ? "bg-gray-100 dark:bg-gray-700 " : ""
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
                        active ? "bg-gray-100 dark:bg-gray-700 dark:text-white" : ""
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

        <NavLink
          to="/mngr-dashboard"
          onClick={() => setHidden(true)}
          className={inActiveClass}
        >
          Manager Portal
        </NavLink>

        <NavLink
          to="/emp-dashboard"
          onClick={() => setHidden(true)}
          className={inActiveClass}
        >
          Employee Portal
        </NavLink>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className= {`${darkMode ? " mt-3 text-center text-sm opacity-80 text-white cursor-pointer bi bi-moon-stars-fill" : "bi bi-sun-fill"}`}
        >   
       
        </button>
      </ul>
    </div>
  );
};

export default Hamburger;

