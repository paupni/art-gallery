import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Artworks from "./pages/gallery/Artworks";
import ErrorPage from "./pages/error/ErrorPage";
import ArtworkDetails from "./pages/gallery/ArtworkDetails";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import ArtistProfile from "./pages/profile/ArtistProfile";
import Artists from "./pages/artists/Artists";
import ArtworkUpload from "./pages/profile/ArtworkUpload";
import ArtworkEdit from "./pages/profile/ArtworkEdit";
import ArtworkDelete from "./pages/profile/ArtworkDelete";
import Logout from "./pages/login/Logout";
import ArtistArtwork from "./pages/artists/ArtistArtwork";
import Dashboard from "./pages/profile/Dashboard";
import ArtworkCategory from "./pages/gallery/ArtworkCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Artworks /> },
      { path: "artwork/:id", element: <ArtworkDetails /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile/:id", element: <ArtistProfile /> },
      { path: "artists", element: <Artists /> },
      { path: "upload", element: <ArtworkUpload /> },
      { path: "artwork/:id/edit", element: <ArtworkEdit /> },
      // {path: "artwork/:id/delete", element: <ArtworkDelete />},
      { path: "logout", element: <Logout /> },
      { path: "artworks/artist/:id", element: <ArtistArtwork /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "artworks/category/:id", element: <ArtworkCategory /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
