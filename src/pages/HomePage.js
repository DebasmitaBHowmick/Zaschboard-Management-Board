import Hero from "../assests/hero.png";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";


const HomePage = () => {
useTitle("Home")
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#96a5f3] to-[#7f93ce] flex items-center">
      {/* Left section */}
      <div className="w-full md:w-1/2 px-12 flex flex-col justify-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          My-Task &amp; Project <br /> Management System
        </h1>
        <p className="text-lg text-white/90">
          This is a solution for everyone. Although it is at the heart of Scrum and is typically used by software development teams, it can be successfully applied to other businesses, as well as used for improving personal productivity.
        </p>
        <div>
          <div className="text-xl font-semibold text-white mb-3">What we  work for :</div>
          <div className="flex space-x-4">
    
            <span className="bg-white rounded-full p-3 shadow text-purple-600">HR</span>
            <span className="bg-white rounded-full p-3 shadow text-orange-500">&lt;/&gt;</span>
            <span className="bg-white rounded-full p-3 shadow text-yellow-500">Health & Commodity</span>
            <span className="bg-white rounded-full p-3 shadow text-orange-700">Products</span>
            <span className="bg-white rounded-full p-3 shadow text-red-600">Work-Life Balance</span>
            <span className="bg-white rounded-full p-3 shadow text-sky-500">Team Effort</span>
          </div>
        </div>
      </div>
      {/* Right section */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
   
        <img src={Hero} alt="Dashboard Preview" className="w-[90%] rounded-xl shadow-2xl border border-white/30" />
      </div>
      <Link to="/mngr-dashboard">
  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
      Manager's Portal
    </span>
  </button>
</Link>

<Link to="/emp-employee">
  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
      Employee's Portal
    </span>
  </button>
</Link>

    </div>
  )
}

export default HomePage
