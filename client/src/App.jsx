import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import LoginPage from "./pages/Login";
import Register from "./pages/Registration";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import { Bounce, ToastContainer } from "react-toastify";
import RequireAuth from "./features/auth/RequireAuth";
import "react-toastify/dist/ReactToastify.css";
import { selectCurrentUser } from "./features/auth/authSlice";
import { useSelector } from "react-redux";
import { useRefreshQuery } from "./features/auth/authApiSlice";

function App() {
  const user = useSelector(selectCurrentUser);
  const { isLoading } = useRefreshQuery();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: user ? (
            <Navigate to="/Home" replace />
          ) : (
            <Navigate to="/Login" replace />
          ),
        },
        {
          element: <RequireAuth />,
          children: [
            {
              path: "/Profile",
              element: <Profile />,
            },
            {
              path: "/Home",
              element: <Home />,
            },
            {
              path: "/Games",
              element: <Games />,
            },
          ],
        },
      ],
    },
    {
      element: <RequireAuth />,
      children: [
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "/Login",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return (
    <div className="w-full overflow-hidden">
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
      {!isLoading && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
