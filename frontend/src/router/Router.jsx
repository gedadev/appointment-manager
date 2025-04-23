import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";

const Signup = () => <div>Signup Page</div>;
const Dashboard = () => <div>Dashboard Page</div>;
const Home = () => <div>Home Page</div>;

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
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
