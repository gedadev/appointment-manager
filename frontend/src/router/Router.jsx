import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { GeneralInfo } from "../components/Profile/GeneralInfo";
import { WorkingHours } from "../components/Profile/WorkingHours";
import { AdvancedInfo } from "../components/Profile/AdvancedInfo";

const Dashboard = () => <div>Dashboard Page</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        path: "",
        element: <GeneralInfo />,
      },
      {
        path: "general",
        element: <GeneralInfo />,
      },
      {
        path: "hours",
        element: <WorkingHours />,
      },
      {
        path: "advanced",
        element: <AdvancedInfo />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
