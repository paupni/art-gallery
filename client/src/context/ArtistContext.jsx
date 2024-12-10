import { createContext, useEffect, useState } from "react";

export const ArtistContext = createContext();

const ArtistProvider = ({ children }) => {
  const [currentArtist, setCurrentArtist] = useState(
    JSON.parse(localStorage.getItem("artist"))
  );

  useEffect(() => {
    localStorage.setItem("artist", JSON.stringify(currentArtist));
  }, [currentArtist]);

  return (
    <ArtistContext.Provider value={{ currentArtist, setCurrentArtist }}>
      {children}
    </ArtistContext.Provider>
  );
};

export default ArtistProvider;
