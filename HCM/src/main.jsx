import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Provider} from 'react-redux';
import { store } from "./app/store";

import ReactDOM from "react-dom/client";

import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import Dashboard from "./pages/Dashboard";
import HealthCenters from "./pages/HealthCenters";
import Login from "./pages/Login";
import Medicine from "./pages/Medicine";
import Doctors from "./pages/Doctors";
import Laboratory from "./pages/Laboratory";
import Bed from "./pages/Bed";
import PatientFootfall from "./pages/PatientFootfall";
import CreateUser from "./pages/CreateUser";
import Users from './pages/Users';
import AIInsights from "./pages/AIInsights";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";

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
          {
            path: "/centres",
            element: <HealthCenters />,
          },
          {
            path: "/medicines",
            element: <Medicine />,
          },
          {
            path: "/doctors",
            element: <Doctors />,
          },
          {
            path: "/patient_footfall",
            element: <PatientFootfall />,
          },
          {
            path: "/laboratory",
            element: <Laboratory />,
          },
          {
            path: "/beds",
            element: <Bed />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/users/create",
            element: <CreateUser />,
          },
          {
            path: "/ai-insights",
            element: <AIInsights />,
          },
          {
            path: "/analytics",
            element: <Analytics />,
          },
          {
            path: "/alerts",
            element: <Alerts />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);