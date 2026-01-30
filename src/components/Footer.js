import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-br from-[#7f93ce] via-[#96a5f3] to-[#6f82c8] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#020617] overflow-hidden">
      {/* Soft glass overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-10">
        {/* Top divider */}
        <div className="w-full h-px bg-white/30 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-sm text-white/80 text-center md:text-left">
            © 2030 <Link to="/" className="hover:underline">ZaschBoard</Link>. All Rights Reserved.
          </span>

          <div className="flex items-center gap-6">
            {/* Twitter / X */}
            <a href="https://x.com/?lang=en" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 1227"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M714.163 519.284L1160.89 0H1056.26L667.137 450.887L356.193 0H0L468.72 681.821L0 1226.68H104.63L512.31 747.029L843.807 1226.68H1200L714.137 519.284H714.163Z" />
              </svg>
            </a>

            {/* GitHub */}
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8c14.9 0 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9C384.1 43.9 352.3 35.7 316.5 34c-37-2.1-147.9-2.1-184.9 0-35.9 1.7-67.7 9.9-93.9 36.2C11.4 96.5 3.2 128.3 1.5 164.1c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.2 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.9 0-184.9z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

