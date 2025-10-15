import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
            <div className="w-full bg-[#1e293b]-xl py-3 md:flex md:items-center md:justify-between md:p-6 dark:bg-slate-800 dark:text-yellow-50">            
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2030 <Link to="/" className="hover:underline">ZaschBoard</Link>. All Rights Reserved.</span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                
                <a href="https://x.com/?lang=en" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1200 1227"
                                fill="currentColor"
                                className="w-5 h-5"
                                aria-hidden="true"
                            >
                                <path d="M714.163 519.284L1160.89 0H1056.26L667.137 450.887L356.193 0H0L468.72 681.821L0 1226.68H104.63L512.31 747.029L843.807 1226.68H1200L714.137 519.284H714.163ZM567.588 682.174L518.474 611.976L142.003 79.7399H306.615L602.845 500.505L651.959 570.704L1046.89 1147.04H882.273L567.588 682.2V682.174Z"/>
                    </svg>
                    <span className="sr-only">X </span>
                </a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    <span className="sr-only">GitHub </span>
                </a>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor"viewBox="0 0 320 512"className="w-5 h-5"aria-hidden="true"
                        >
                            <path d="M279.14 288l14.22-92.66h-88.91V134.9c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S293.46 0 268.11 0c-73.61 0-121.31 44.38-121.31 124.72V195.3H86.41V288h60.39v224h92.66V288z"/>
                        </svg>
                        <span className="sr-only">Facebook</span>
                    </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
