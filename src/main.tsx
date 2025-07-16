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
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
)
