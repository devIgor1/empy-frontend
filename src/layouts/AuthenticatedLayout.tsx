import Sidebar from "../components/Sidebar"

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen pt-20 md:pt-6">
        {children}
      </main>
    </div>
  )
}

export default AuthenticatedLayout
