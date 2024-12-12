import Artworks from "../pages/gallery/Artworks";
import ArtworkDetails from "../pages/gallery/ArtworkDetails";
import Register from "../pages/login/Register";
import Login from "../pages/login/Login";
import ArtistProfile from "../pages/profile/ArtistProfile";
import Artists from "../pages/artists/Artists";
import ArtworkUpload from "../pages/profile/ArtworkUpload";
import ArtworkEdit from "../pages/profile/ArtworkEdit";
import Logout from "../pages/login/Logout";
import ArtistArtworks from "../pages/artists/ArtistArtworks";
import AdminPanel from "../pages/profile/AdminPanel";
import ArtworksCategory from "../pages/gallery/ArtworksCategory";
import ArtistBio from "../pages/artists/ArtistBio";
import Categories from "../pages/gallery/Categories";

export const routes = [
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
  { path: "myartworks/:id", element: <AdminPanel /> },
  { path: "artworks/categories/:id", element: <ArtworksCategory /> },
  { path: "artists/:id", element: <ArtistBio /> },
  { path: "categories", element: <Categories /> },
];
