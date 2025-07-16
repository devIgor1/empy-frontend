import empyLogo from "../assets/empy, icon2.svg"
import { CiSearch } from "react-icons/ci"
import {
  PiMoneyLight,
  PiCoinsLight,
  PiUserCircleGearLight,
} from "react-icons/pi"
import logoutIcon from "../assets/logout.svg"
import profileIcon from "../assets/profilePic.svg"

export default function Sidebar() {
  return (
    <div className="w-[90px] bg-[#2F51FB] text-white min-h-screen flex flex-col items-center py-4">
      <img src={empyLogo} alt="Logo" className="w-full h-12 mb-6" />

      <nav className="flex flex-col gap-3 items-center p-5">
        <span className="hover:bg-[#657CFE] rounded-sm p-2 cursor-pointer">
          <CiSearch size={27} />
        </span>
        <span className="hover:bg-[#657CFE] rounded-sm p-2 cursor-pointer">
          <PiMoneyLight size={27} />
        </span>
        <span className="bg-[#657CFE] rounded-sm p-2 cursor-pointer">
          <PiCoinsLight size={27} color="#3B51FF" />
        </span>
      </nav>

      <div className="mt-auto flex flex-col items-center gap-6 pb-4">
        <span>
          <PiUserCircleGearLight size={27} />
        </span>
        <span>
          <div className="relative">
            <img
              src={profileIcon}
              alt="Foto do usuário"
              className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/40 cursor-pointer transition-all duration-200"
            />
          </div>
        </span>
        <span>
          <img src={logoutIcon} alt="Logout" className="w-6 h-6" />
        </span>
      </div>
    </div>
  )
}
