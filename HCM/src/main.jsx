import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ReactDOM from "react-dom/client";

import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);