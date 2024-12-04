// ========================== REGISTER A NEW ARTIST
// POST : api/artists/register
// UNPROTECTED
const registerArtist = async (req, res, next) => {
  res.json("Register Artist");
};

// ========================== LOGIN A REGISTERED ARTIST
// POST : api/artists/login
// UNPROTECTED
const loginArtist = async (req, res, next) => {
  res.json("Login Artist");
};

// ========================== ARTIST PROFILE
// POST : api/artists/:id
// PROTECTED
const getArtist = async (req, res, next) => {
  res.json("Artist Profile");
};

// ========================== CHANGE ARTIST AVATAR (profile picture)
// POST : api/artists/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
  res.json("Change Artist Avatar");
};

// ==========================  EDIT ARTIST DETAILS (from profile)
// POST : api/artists/edit-artist
// PROTECTED
const editArtist = async (req, res, next) => {
  res.json("Edit artist details");
};

// ========================== GET ARTISTS
// POST : api/artists/
// UNPROTECTED
const getArtists = async (req, res, next) => {
  res.json("Get all artists");
};

module.exports = {
  registerArtist,
  loginArtist,
  getArtist,
  changeAvatar,
  editArtist,
  getArtists,
};
