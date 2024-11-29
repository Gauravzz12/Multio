import React, { Suspense, lazy, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { selectCurrentUser } from "./features/auth/authSlice";
import { useSelector } from "react-redux";
import { useRefreshQuery } from "./features/auth/authApiSlice";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./components/Layout"));
const LoginPage = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Registration"));
const Games = lazy(() => import("./pages/Games"));
const Profile = lazy(() => import("./pages/Profile"));
const RequireAuth = lazy(() => import("./features/auth/RequireAuth"));
const OAuthSuccess = lazy(() => import("./features/auth/OAuthSuccess"));
const RPS = lazy(() => import("./components/GameBoards/RPS"));
const TTT = lazy(() => import("./components/GameBoards/TTT"));

function App() {
  const user = useSelector(selectCurrentUser);
  const { isLoading, isError } = useRefreshQuery(undefined, {
    skip: user === "Guest",
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <Layout />
        </Suspense>
      ),
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
          element: (
            <Suspense fallback={<Loader />}>
              <RequireAuth />
            </Suspense>
          ),
          children: [
            {
              path: "/Profile",
              element: (
                <Suspense fallback={<Loader />}>
                  <Profile />
                </Suspense>
              ),
            },
            {
              path: "/Home",
              element: (
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              ),
            },
            {
              path: "/Games",
              element: (
                <Suspense fallback={<Loader />}>
                  <Games />
                </Suspense>
              ),
            },
            {
              path: "/Games/RPS",
              element: (
                <Suspense fallback={<Loader />}>
                  <RPS />
                </Suspense>
              ),
            },
            {
              path: "/Games/TTT",
              element: (
                <Suspense fallback={<Loader />}>
                  <TTT />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/Register",
      element: (
        <Suspense fallback={<Loader />}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "/Login",
      element: (
        <Suspense fallback={<Loader />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/oauth/success",
      element: (
        <Suspense fallback={<Loader />}>
          <OAuthSuccess />
        </Suspense>
      ),
    },
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={1000}
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