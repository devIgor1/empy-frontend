import empyLogo from "../assets/empyIcon2.svg"
import { CiSearch } from "react-icons/ci"
import {
  PiMoneyLight,
  PiCoinsLight,
  PiUserCircleGear,
  PiChartPie,
  PiWallet,
  PiChartLineUp,
  PiLink,
  PiBroadcast,
} from "react-icons/pi"
import logoutIcon from "../assets/logout.svg"
import logoutLightMode from "../assets/logoutLightMode.svg"
import profileIcon from "../assets/profilePic.svg"
import { Link, useLocation } from "react-router-dom"
import empyIcon4 from "../assets/empyIcon4.svg"

export default function Sidebar() {
  const location = useLocation()
  const isAdmin = location.pathname.includes("/admin")

  return (
    <div
      className={`w-[90px] ${
        isAdmin ? "bg-white empy-text-gray" : "bg-[#2F51FB] text-white"
      } min-h-screen flex flex-col items-center py-4 transition-all duration-300`}
    >
      {isAdmin ? (
        <img src={empyIcon4} alt="Logo" className="w-full h-12 mb-6" />
      ) : (
        <img src={empyLogo} alt="Logo" className="w-full h-12 mb-6" />
      )}

      <nav className="flex flex-col gap-5 items-center p-5">
        <span
          className={`rounded-lg p-2 cursor-pointer ${
            isAdmin ? "hover:bg-gray-200" : "hover:bg-[#657CFE]"
          }`}
        >
          {isAdmin ? (
            <PiChartPie size={30} color="#121929A3" />
          ) : (
            <CiSearch size={30} />
          )}
        </span>
        <span
          className={`rounded-lg p-2 cursor-pointer ${
            isAdmin ? "hover:bg-gray-200" : "hover:bg-[#657CFE]"
          }`}
        >
          {isAdmin ? (
            <PiWallet size={30} color="#121929A3" />
          ) : (
            <PiMoneyLight size={30} />
          )}
        </span>
        <span
          className={`rounded-lg p-2 cursor-pointer ${
            isAdmin ? "hover:bg-gray-200" : "bg-[#657CFE]"
          }`}
        >
          {isAdmin ? (
            <PiChartLineUp size={30} color="#121929A3" />
          ) : (
            <PiCoinsLight size={30} color="#3B51FF" />
          )}
        </span>
        {isAdmin && (
          <span className="rounded-lg p-2 cursor-pointer bg-[#657CFE]">
            <PiLink size={30} color="#121929A3" />
          </span>
        )}
        {isAdmin && (
          <span className="cursor-pointer hover:bg-gray-200 rounded-lg p-2">
            <PiBroadcast size={30} color="#121929A3" />
          </span>
        )}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-6 pb-4">
        <Link
          to="/admin/active-plans"
          className={`p-1 rounded-lg ${
            isAdmin ? "hover:bg-gray-200" : "hover:bg-[#657cfe]"
          }`}
        >
          <PiUserCircleGear size={30} />
        </Link>
        <span>
          <div className="relative">
            <img
              src={profileIcon}
              alt="Foto do usuário"
              className={`w-8 h-8 rounded-full border-2 ${
                isAdmin
                  ? "border-black/20 hover:border-black/40"
                  : "border-white/20 hover:border-white/40"
              } cursor-pointer transition-all duration-200`}
            />
          </div>
        </span>
        <span>
          {isAdmin ? (
            <img
              src={logoutLightMode}
              alt="Logout"
              className="w-6 h-6 cursor-pointer"
            />
          ) : (
            <img
              src={logoutIcon}
              alt="Logout"
              className="w-6 h-6 cursor-pointer"
            />
          )}
        </span>
      </div>
    </div>
  )
}
