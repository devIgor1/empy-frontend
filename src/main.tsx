import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Checkout from "./pages/Checkout.tsx"
import Receipt from "./components/Receipt.tsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import MyPlanPage from "./pages/MyPlan.tsx"
import HistoryPage from "./pages/History.tsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/checkout/:cycle",
    element: <Checkout />,
  },
  {
    path: "/receipt",
    element: <Receipt />,
  },
  {
    path: "/my-plan",
    element: <MyPlanPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
)
