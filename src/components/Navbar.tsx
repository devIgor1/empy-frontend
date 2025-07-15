import logo from "../assets/logo.svg"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 w-full">
      <button className="text-sm text-gray-700 border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-100 cursor-pointer">
        Voltar
      </button>

      <div className="mx-auto">
        <img src={logo} alt="Empy Logo" className="h-6 md:h-8" />
      </div>
    </nav>
  )
}

export default Navbar
