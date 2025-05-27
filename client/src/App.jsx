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
const ConnectFour = lazy(() => import("./components/GameBoards/ConnectFour"));
const WordBattle = lazy(() => import("./components/GameBoards/WordBattle"));
const MemoryMatch = lazy(() => import("./components/GameBoards/MemoryMatch"));
const NumberGuess = lazy(() => import("./components/GameBoards/NumberGuess"));
const QuickDraw = lazy(() => import("./components/GameBoards/QuickDraw"));
const MathDuel = lazy(() => import("./components/GameBoards/MathDuel"));
const ColorMatch = lazy(() => import("./components/GameBoards/ColorMatch"));
const TypingRace = lazy(() => import("./components/GameBoards/TypingRace"));

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
            {
              path: "/Games/ConnectFour",
              element: (
                <Suspense fallback={<Loader />}>
                  <ConnectFour />
                </Suspense>
              ),
            },
            {
              path: "/Games/WordBattle",
              element: (
                <Suspense fallback={<Loader />}>
                  <WordBattle />
                </Suspense>
              ),
            },
            {
              path: "/Games/MemoryMatch",
              element: (
                <Suspense fallback={<Loader />}>
                  <MemoryMatch />
                </Suspense>
              ),
            },
            {
              path: "/Games/NumberGuess",
              element: (
                <Suspense fallback={<Loader />}>
                  <NumberGuess />
                </Suspense>
              ),
            },
            {
              path: "/Games/QuickDraw",
              element: (
                <Suspense fallback={<Loader />}>
                  <QuickDraw />
                </Suspense>
              ),
            },
            {
              path: "/Games/MathDuel",
              element: (
                <Suspense fallback={<Loader />}>
                  <MathDuel />
                </Suspense>
              ),
            },
            {
              path: "/Games/ColorMatch",
              element: (
                <Suspense fallback={<Loader />}>
                  <ColorMatch />
                </Suspense>
              ),
            },
            {
              path: "/Games/TypingRace",
              element: (
                <Suspense fallback={<Loader />}>
                  <TypingRace />
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
    <div className="flex flex-col mx-auto w-full max-w-[1700px] overflow-hidden scroll-smooth">
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