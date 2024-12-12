import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/error/ErrorPage";
import ArtistProvider from "./context/ArtistContext";
import { routes } from "./utils/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ArtistProvider>
        <Layout />
      </ArtistProvider>
    ),
    errorElement: <ErrorPage />,
    children: routes,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
