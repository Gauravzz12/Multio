import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import LoginPage from "./pages/Login";
import Register from "./pages/Registration";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import { Bounce, ToastContainer } from "react-toastify";
import RequireAuth from "./features/auth/RequireAuth";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Home",
          element: <Home />,
        },
        {
          path: "/Games",
          element: <Games />,
        },
        {
          element: <RequireAuth />,
          children: [
            {
              path: "/Profile",
              element: <Profile />,
            },
            {
              path:"/Games"
            }
          ],
        },
      ],
    },
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/Login",
      element: <LoginPage />,
    },
  ]);
  return (
    <div className="w-full overflow-hidden ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
