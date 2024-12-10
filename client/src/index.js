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
import Logout from "./pages/login/Logout";
import ArtistArtworks from "./pages/artists/ArtistArtworks";
import Dashboard from "./pages/profile/Dashboard";
import ArtworksCategory from "./pages/gallery/ArtworksCategory";
import ArtistProvider from "./context/ArtistContext";
import ArtistBio from "./pages/artists/ArtistBio";
import Categories from "./pages/gallery/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ArtistProvider>
        <Layout />
      </ArtistProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Artworks /> },
      { path: "artworks/:id", element: <ArtworkDetails /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile/:id", element: <ArtistProfile /> },
      { path: "artists", element: <Artists /> },
      { path: "upload", element: <ArtworkUpload /> },
      { path: "artworks/:id/edit", element: <ArtworkEdit /> },
      { path: "logout", element: <Logout /> },
      { path: "artworks/artists/:id", element: <ArtistArtworks /> },
      { path: "myartworks/:id", element: <Dashboard /> },
      { path: "artworks/categories/:id", element: <ArtworksCategory /> },
      { path: "artists/:id", element: <ArtistBio /> },
      { path: "categories", element: <Categories /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
