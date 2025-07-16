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
import { TbBuildings } from "react-icons/tb"

import logoutIcon from "../assets/logout.svg"
import logoutLightMode from "../assets/logoutLightMode.svg"
import profileIcon from "../assets/profilePic.svg"
import { Link, useLocation } from "react-router-dom"
import empyIcon4 from "../assets/empyIcon4.svg"
import { useState } from "react"
import { HiMenu } from "react-icons/hi"
import empyandLogo from "../assets/empylogohorizontal4.svg"

export default function Sidebar() {
  const [sideBarInfo, setSideBarInfo] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isAdmin = location.pathname.includes("/admin")

  const toggleSideBarInfo = () => {
    setSideBarInfo(!sideBarInfo)
  }

  const handleMobileSidebar = () => {
    setMobileOpen((prev) => !prev)
  }

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow"
        onClick={handleMobileSidebar}
        aria-label="Abrir menu"
      >
        <HiMenu size={28} />
      </button>

      {/* Overlay escuro no mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-40 z-40 md:hidden"
          onClick={handleMobileSidebar}
        />
      )}

      {/* Sidebar responsiva */}
      <div
        className={`
          ${
            sideBarInfo
              ? "w-[250px] items-start pl-4"
              : "w-[100px] items-center"
          }
          ${isAdmin ? "bg-white empy-text-gray" : "bg-[#2F51FB] text-white"}
          min-h-screen flex flex-col py-4 transition-all duration-300
          fixed z-50 top-0 left-0
          md:static md:z-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{ maxWidth: sideBarInfo ? 250 : 100 }}
      >
        {isAdmin ? (
          <button onClick={() => toggleSideBarInfo()}>
            <div
              className={`w-full flex ${
                sideBarInfo ? "justify-start pl-4" : "justify-center"
              }`}
            >
              <img
                src={sideBarInfo ? empyandLogo : empyIcon4}
                alt="Logo"
                className="h-12 mb-6 cursor-pointer"
              />
            </div>
          </button>
        ) : (
          <div
            className={`w-full flex ${
              sideBarInfo ? "justify-start pl-4" : "justify-center"
            }`}
          >
            <img src={empyLogo} alt="Logo" className="h-12 mb-6" />
          </div>
        )}

        <nav
          className={`flex flex-col gap-5 p-5 w-full ${
            sideBarInfo ? "items-start pl-4" : "items-center"
          }`}
        >
          <span
            className={`rounded-lg p-2 cursor-pointer ${
              isAdmin ? "hover:bg-gray-200" : "hover:bg-[#657CFE]"
            }`}
          >
            {isAdmin ? (
              <div
                className={`flex gap-2 ${
                  sideBarInfo
                    ? "items-center justify-start pl-4"
                    : "items-center justify-center"
                }`}
              >
                <PiChartPie size={30} color="#121929A3" />
                {sideBarInfo && <p className="text-base">Dashboard</p>}
              </div>
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
              <div
                className={`flex gap-2 ${
                  sideBarInfo
                    ? "items-center justify-start pl-4"
                    : "items-center justify-center"
                }`}
              >
                <PiWallet size={30} color="#121929A3" />
                {sideBarInfo && <p className="text-base">Wallet</p>}
              </div>
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
              <div
                className={`flex gap-2 ${
                  sideBarInfo
                    ? "items-center justify-start pl-4"
                    : "items-center justify-center"
                }`}
              >
                <PiChartLineUp size={30} color="#121929A3" />
                {sideBarInfo && <p className="text-base">Power Bi</p>}
              </div>
            ) : (
              <PiCoinsLight size={30} color="#3B51FF" />
            )}
          </span>
          {isAdmin && (
            <span className="rounded-lg p-2 cursor-pointer bg-[#657CFE]">
              <div
                className={`flex gap-2 ${
                  sideBarInfo
                    ? "items-center justify-start pl-4"
                    : "items-center justify-center"
                }`}
              >
                <PiLink size={30} color="#121929A3" />
                {sideBarInfo && <p className="text-base">Planos</p>}
              </div>
            </span>
          )}
          {isAdmin && (
            <span className="cursor-pointer hover:bg-gray-200 rounded-lg p-2">
              <div
                className={`flex gap-2 ${
                  sideBarInfo
                    ? "items-center justify-start pl-4"
                    : "items-center justify-center"
                }`}
              >
                <PiBroadcast size={30} color="#121929A3" />
                {sideBarInfo && <p className="text-base">Lives</p>}
              </div>
            </span>
          )}
        </nav>

        <div
          className={`mt-auto flex flex-col gap-6 pb-4 w-full ${
            sideBarInfo ? "items-start pl-4" : "items-center"
          }`}
        >
          {isAdmin ? (
            <Link
              to="/my-plan"
              className={`p-1 rounded-lg ${
                isAdmin ? "hover:bg-gray-200" : "hover:bg-[#657cfe]"
              }`}
            >
              <div
                className={`flex gap-2 w-full ${
                  sideBarInfo
                    ? "items-center justify-start pl-4"
                    : "items-center justify-center"
                }`}
              >
                <TbBuildings size={30} color="#121929A3" />
                {sideBarInfo && <p className="text-base">Empresas</p>}
              </div>
            </Link>
          ) : (
            <Link
              to="/admin/active-plans"
              className={`p-1 rounded-lg ${
                isAdmin ? "hover:bg-gray-200" : "hover:bg-[#657cfe]"
              }`}
            >
              <PiUserCircleGear size={30} />
            </Link>
          )}
          <span>
            <div
              className={`relative ${
                sideBarInfo ? "self-start" : "self-center"
              } w-full`}
            >
              <div
                className={`flex ${
                  sideBarInfo
                    ? "items-center justify-start pl-4"
                    : "items-center justify-center"
                } gap-2 w-full`}
              >
                <img
                  src={profileIcon}
                  alt="Foto do usuário"
                  className={`w-8 h-8 rounded-full border-2 ${
                    isAdmin
                      ? "border-black/20 hover:border-black/40"
                      : "border-white/20 hover:border-white/40"
                  } cursor-pointer transition-all duration-200`}
                />
                {sideBarInfo && <p className="text-base">Usuário</p>}
              </div>
            </div>
          </span>
          <span>
            {isAdmin ? (
              <div
                className={`flex gap-2 w-full ${
                  sideBarInfo
                    ? "items-center justify-start pl-4"
                    : "items-center justify-center"
                }`}
              >
                <img
                  src={logoutLightMode}
                  alt="Logout"
                  className="w-6 h-6 cursor-pointer"
                />
                {sideBarInfo && <p className="text-base">Sair</p>}
              </div>
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
    </>
  )
}
