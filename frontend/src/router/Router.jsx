import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

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
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
