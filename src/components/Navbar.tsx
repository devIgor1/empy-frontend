import logo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="flex justify-center items-center px-4 py-2 w-full mx-auto">
      <button
        className="text-sm text-gray-700 border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>

      <div className="mx-auto">
        <img src={logo} alt="Empy Logo" className="h-6 md:h-8" />
      </div>
    </nav>
  )
}

export default Navbar
