import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Games from "./pages/Games";
import Profile from "./pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/Home",
          element: <Home />,
        },

        {
          path: "/Games",
          element: <Games />,
        },
        {
          path: "/Profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
  ]);
  return (
    <div className="w-full overflow-hidden ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
