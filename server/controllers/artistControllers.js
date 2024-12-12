const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const Artist = require("../models/artistModel");
const HttpError = require("../models/errorModel");

const registerArtist = async (req, res, next) => {
  try {
    const { name, surname, email, password, password2, bio } = req.body;
    if (!name || !surname || !email || !password) {
      return next(new HttpError("Fill in all fields", 418));
    }

    const newEmail = email.toLowerCase();

    const emailExist = await Artist.findOne({ email: newEmail });
    if (emailExist) {
      return next(new HttpError("Artist already exists", 418));
    }

    if (password.length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters.", 418)
      );
    }

    if (password != password2) {
      return next(new HttpError("Passwords do not match", 418));
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
    return next(new HttpError("Artist registration failed", 418));
  }
};

const loginArtist = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Fill in all fields", 418));
    }
    const newEmail = email.toLowerCase();

    const artist = await Artist.findOne({ email: newEmail });

    if (!artist) {
      return next(new HttpError("Authentication failed", 418));
    }

    const comparePass = await bcrypt.compare(password, artist.password);
    if (!comparePass) {
      return next(new HttpError("Authentication failed", 418));
    }

    const { _id: id, name } = artist;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, id, name });
  } catch (err) {
    return next(
      new HttpError("Login failed. Pease check your credentials", 418)
    );
  }
};

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

const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("Please choose an image", 418));
    }

    const artist = await Artist.findById(req.artist.id);

    if (artist.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", artist.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }

    const { avatar } = req.files;
    if (avatar.size > 5000000) {
      return next(new HttpError("Profile picture too big", 418));
    }

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
          return next(new HttpError("Avatar could not be changed", 418));
        }
        res.status(200).json(updatedAvatar);
      }
    );
  } catch (err) {
    return next(new HttpError(err));
  }
};

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
      changePassword,
    } = req.body;

    let newInfo;

    if (changePassword === "true") {
      if (!name || !surname || !email || !currentPassword || !newPassword) {
        return next(new HttpError("Fill in all fields", 418));
      }

      const artist = await Artist.findById(req.artist.id);
      if (!artist) {
        return next(new HttpError("Artist not found", 403));
      }

      const emailExist = await Artist.findOne({ email });
      if (emailExist && emailExist._id != req.artist.id) {
        return next(new HttpError("Email already exist", 418));
      }

      const validateArtistPassword = await bcrypt.compare(
        currentPassword,
        artist.password
      );
      if (!validateArtistPassword) {
        return next(new HttpError("Invalid current password", 418));
      }

      if (newPassword !== confirmedNewPassword) {
        return next(new HttpError("New passwords do not match"), 418);
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      newInfo = await Artist.findByIdAndUpdate(
        req.artist.id,
        { name, surname, bio, email, password: hash },
        { new: true }
      );
    } else {
      if (!name || !surname || !email) {
        return next(new HttpError("Fill in all fields", 418));
      }

      const artist = await Artist.findById(req.artist.id);
      if (!artist) {
        return next(new HttpError("Artist not found", 403));
      }

      const emailExist = await Artist.findOne({ email });
      if (emailExist && emailExist._id != req.artist.id) {
        return next(new HttpError("Email already exist", 418));
      }

      newInfo = await Artist.findByIdAndUpdate(
        req.artist.id,
        { name, surname, bio, email },
        { new: true }
      );
    }

    res.status(200).json(newInfo);
  } catch (err) {
    return next(new HttpError(err));
  }
};

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
