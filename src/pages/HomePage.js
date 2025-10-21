import Hero from "../assests/hero.png";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";


const HomePage = () => {
useTitle("Home")
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#96a5f3] to-[#7f93ce] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-10">
  {/* Left section */}
  <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 mb-10 md:mb-0">
    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight text-center md:text-left">
      My-Task &amp; Project <br /> Management System
    </h1>
    <p className="text-base md:text-lg text-white/90 text-center md:text-left">
      This is a solution for everyone. Although it is at the heart of Scrum and
      is typically used by software development teams, it can be successfully
      applied to other businesses, as well as used for improving personal
      productivity.
    </p>

    <div className="text-center md:text-left">
      <div className="text-lg md:text-xl font-semibold text-white mb-3">
        What we work for :
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        <span className="bg-white rounded-full px-4 py-2 shadow text-purple-600 text-sm font-medium">HR</span>
        <span className="bg-white rounded-full px-4 py-2 shadow text-orange-500 text-sm font-medium">&lt;/&gt;</span>
        <span className="bg-white rounded-full px-4 py-2 shadow text-yellow-500 text-sm font-medium">Health & Commodity</span>
        <span className="bg-white rounded-full px-4 py-2 shadow text-orange-700 text-sm font-medium">Products</span>
        <span className="bg-white rounded-full px-4 py-2 shadow text-red-600 text-sm font-medium">Work-Life Balance</span>
        <span className="bg-white rounded-full px-4 py-2 shadow text-sky-500 text-sm font-medium">Team Effort</span>
      </div>
    </div>
  </div>

  {/* Right section */}
  <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-6">
    <img
      src={Hero}
      alt="Dashboard Preview"
      className="w-[90%] md:w-[80%] rounded-xl shadow-2xl border border-white/30"
    />

    {/* Portal Buttons (centered) */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/mngr-dashboard">
        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent">
            Manager's Portal
          </span>
        </button>
      </Link>

      <Link to="/emp-employee">
        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent">
            Employee's Portal
          </span>
        </button>
      </Link>
    </div>
  </div>
</div>

  )
}

export default HomePage
