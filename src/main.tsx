import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Checkout from "./pages/Checkout.tsx"
import Receipt from "./components/Receipt.tsx"

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
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
