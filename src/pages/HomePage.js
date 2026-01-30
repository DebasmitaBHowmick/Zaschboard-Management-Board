import Hero from "../assests/hero.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-[#7f93ce] via-[#96a5f3] to-[#6f82c8] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#020617]">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            My-Task & Project <br /> Management System
          </h1>
          <p className="mt-6 text-white/90 text-lg max-w-xl">
            Organize projects, streamline collaboration, and boost productivity. Designed for teams, managers, and individuals who value efficiency.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to="/mngr-dashboard">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-lg hover:scale-105 transition">
                Manager Portal
              </button>
            </Link>
            <Link to="/emp-dashboard">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-cyan-500 text-white font-medium shadow-lg hover:scale-105 transition">
                Employee Portal
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img src={Hero} alt="dashboard" className="w-[90%] rounded-2xl shadow-2xl" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-28 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">Key Features</h2>
        <p className="text-center text-white/80 mt-2">Powerful tools to make your work easier</p>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "Task Management", desc: "Organize and manage tasks efficiently." },
            { title: "Team Collaboration", desc: "Enhance teamwork and communication." },
            { title: "Real-Time Updates", desc: "Stay updated with instant notifications." },
            { title: "Analytics Dashboard", desc: "Track progress with visual insights." },
          ].map((item, i) => (
            <div key={i} className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-center text-white shadow-lg hover:-translate-y-2 transition">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm opacity-90">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-28 max-w-6xl mx-auto px-6">
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">How It Works</h2>
          <p className="text-center text-white/80 mt-2">Powerful tools to make your work easier.</p>

          <div className="relative mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Glow line */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            {[
              {
                step: "01",
                title: "Create Tasks",
                desc: "Easily create, edit, and define your tasks and projects.",
                color: "bg-sky-500",
              },
              {
                step: "02",
                title: "Assign Tasks",
                desc: "Delegate tasks to team members with just a few clicks.",
                color: "bg-blue-500",
              },
              {
                step: "03",
                title: "Track Progress",
                desc: "Monitor project progress in real-time on your dashboard.",
                color: "bg-green-500",
              },
              {
                step: "04",
                title: "Deliver Results",
                desc: "Complete tasks and achieve project goals efficiently.",
                color: "bg-purple-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-2 transition"
              >
                <div className={`w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-full text-white font-semibold ${item.color}`}>
                  {item.step}
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-800/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-28 mb-20 max-w-5xl mx-auto px-6 text-center">
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to boost productivity?</h2>
          <p className="mt-4 text-white/80">Get started today and streamline your workflow.</p>

          <Link to="/register">
            <button className="mt-8 px-10 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-xl hover:scale-105 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

