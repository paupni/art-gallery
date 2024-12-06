const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Artist = require("../models/artistModel");
const HttpError = require("../models/errorModel");

// ========================== REGISTER A NEW ARTIST
// POST : api/artists/register
// UNPROTECTED
const registerArtist = async (req, res, next) => {
  try {
    const { name, surname, email, password, password2 } = req.body;
    if (!name || !surname || !email || !password) {
      return next(new HttpError("Fill in all fields", 422));
    }

    const newEmail = email.toLowerCase();

    const emailExist = await Artist.findOne({ email: newEmail });
    if (emailExist) {
      return next(new HttpError("Artist already exists", 422));
    }

    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters.", 422)
      );
    }

    if (password != password2) {
      return next(new HttpError("Passwords do not match", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newArtist = await Artist.create({
      name,
      email: newEmail,
      password: hashedPass,
    });

    res.status(201).json(`New artist ${newArtist} registered`);
  } catch (err) {
    return next(new HttpError("Artist registration failed", 422));
  }
};

// ========================== LOGIN A REGISTERED ARTIST
// POST : api/artists/login
// UNPROTECTED
const loginArtist = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Fill in all fields", 422));
    }
    const newEmail = email.toLowerCase();

    const artist = await Artist.findOne({ email: newEmail });

    if (!artist) {
      return next(new HttpError("Wrong email", 422));
    }

    const comparePass = await bcrypt.compare(password, artist.password);
    if (!comparePass) {
      return next(new HttpError("Wrong password", 422));
    }

    const { _id: id, name } = artist;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, id, name });
  } catch (err) {
    return next(
      new HttpError("Login failed. Pease check your credentials", 422)
    );
  }
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
