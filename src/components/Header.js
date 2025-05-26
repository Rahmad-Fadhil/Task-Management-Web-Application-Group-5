import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-decoration-none group">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-sm transition-all duration-300 group-hover:bg-blue-600">
              T
            </div>
            <h1 className="text-xl font-bold text-gray-800 ml-2 transition-all duration-300 group-hover:text-blue-600">
              TaskEasy
            </h1>
          </Link>
          <Link
            to="/add"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center shadow-sm transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Task
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
