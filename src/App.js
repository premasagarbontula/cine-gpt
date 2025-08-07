import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import appStore from "./redux/appStore";
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
      { path: "*", element: <NotFound /> }, // Catch-all route for 404
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
