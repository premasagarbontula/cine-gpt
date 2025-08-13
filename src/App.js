import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/Login";
import Browse from "./features/home/Browse";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import LandingPage from "./features/home/LandingPage";
import Layout from "./components/Layout/Layout";
import NotFound from "./features/home/NotFound";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <Login /> },
      {
        path: "/browse",
        element: (
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
