import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import AuthenticationPage from "./pages/public/AuthenticationPage";
import ErrorPage from "./pages/public/ErrorPage";
import HomePage from "./pages/public/HomePage";
import SandboxPage from "./pages/public/SandboxPage";
import ScenarioListPage from "./pages/public/ScenarioListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/auth",
        index: true,
        element: <AuthenticationPage />,
      },
      {
        path: "/scenarios",
        element: <ScenarioListPage />,
      },

      {
        path: "/labo",
        element: <SandboxPage />,
      },
    ],
  },
]);
export default router;
