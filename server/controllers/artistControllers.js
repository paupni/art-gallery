const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const Artist = require("../models/artistModel");
const HttpError = require("../models/errorModel");

// ========================== REGISTER A NEW ARTIST
// POST : api/artists/register
// UNPROTECTED
const registerArtist = async (req, res, next) => {
  try {
    const { name, surname, email, password, password2, bio } = req.body;
    if (!name || !surname || !email || !password) {
      return next(new HttpError("Fill in all fields", 422));
    }

    const newEmail = email.toLowerCase();

    const emailExist = await Artist.findOne({ email: newEmail });
    if (emailExist) {
      return next(new HttpError("Artist already exists", 422));
    }

    if (password.length < 6) {
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
      surname,
      email: newEmail,
      password: hashedPass,
      bio,
    });

    res.status(201).json(`New artist ${newArtist.name} registered`);
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
      return next(new HttpError("Authentication failed", 422));
    }

    const comparePass = await bcrypt.compare(password, artist.password);
    if (!comparePass) {
      return next(new HttpError("Authentication failed", 422));
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
// GET : api/artists/:id
// PROTECTED
const getArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id).select("-password");
    if (!artist) {
      return next(new HttpError("Artist not found", 404));
    }
    res.status(200).json(artist);
  } catch (err) {
    return next(new HttpError(err));
  }
};

// ========================== CHANGE ARTIST AVATAR (profile picture)
// POST : api/artists/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("Please choose an image", 422));
    }

    // find artist from database
    const artist = await Artist.findById(req.artist.id);

    // delete the old avatar if exist
    if (artist.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", artist.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }

    const { avatar } = req.files;
    if (avatar.size > 5000000) {
      return next(new HttpError("Profile picture too big", 422));
    }

    // change the name of the file
    let fileName;
    fileName = avatar.name;
    let splittedFileName = fileName.split(".");
    let newFileName =
      splittedFileName[0] +
      uuid() +
      "." +
      splittedFileName[splittedFileName.length - 1];

    avatar.mv(
      path.join(__dirname, "..", "uploads", newFileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }

        const updatedAvatar = await Artist.findByIdAndUpdate(
          req.artist.id,
          { avatar: newFileName },
          { new: true }
        );
        if (!updatedAvatar) {
          return next(new HttpError("Avatar could not be changed", 422));
        }
        res.status(200).json(updatedAvatar);
      }
    );
  } catch (err) {
    return next(new HttpError(err));
  }
};

// ==========================  EDIT ARTIST DETAILS (from profile)
// PATCH : api/artists/edit-artist
// PROTECTED
const editArtist = async (req, res, next) => {
  try {
    const {
      name,
      surname,
      bio,
      email,
      currentPassword,
      newPassword,
      confirmedNewPassword,
    } = req.body;
    if (!name || !surname || !email || !currentPassword || !newPassword) {
      return next(new HttpError("Fill in all fields", 422));
    }

    //get artist from database
    const artist = await Artist.findById(req.artist.id);
    if (!artist) {
      return next(new HttpError("Artist not found", 403));
    }

    //make sure new email doesn't already exist
    const emailExist = await Artist.findOne({ email });
    if (emailExist && emailExist._id != req.artist.id) {
      return next(new HttpError("Email already exist", 422));
    }

    //compare current pass to db pass
    const validateArtistPassword = await bcrypt.compare(
      currentPassword,
      artist.password
    );
    if (!validateArtistPassword) {
      return next(new HttpError("Invalid current password", 422));
    }

    //compare new passwords
    if (newPassword !== confirmedNewPassword) {
      return next(new HttpError("New passwords do not match"), 422);
    }

    // hash new pass
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // update artist info in database
    const newInfo = await Artist.findByIdAndUpdate(
      req.artist.id,
      { name, surname, bio, email, password: hash },
      { new: true }
    );

    res.status(200).json(newInfo);
  } catch (err) {
    return next(new HttpError(err));
  }
};

// ========================== GET ARTISTS
// GET : api/artists/
// UNPROTECTED
const getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find().select("-password");
    res.status(200).json(artists);
  } catch (err) {
    return next(new HttpError(err));
  }
};

module.exports = {
  registerArtist,
  loginArtist,
  getArtist,
  changeAvatar,
  editArtist,
  getArtists,
};
