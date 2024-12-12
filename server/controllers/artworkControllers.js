const Artwork = require("../models/artworkModel");
const Artist = require("../models/artistModel");
const HttpError = require("../models/errorModel");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const uploadArtwork = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;

    if (!title || !category || !description || !req.files) {
      return next(new HttpError("Fill in all fields and choose thumb", 418));
    }

    const { thumb } = req.files;

    if (thumb.size > 2000000) {
      return next(new HttpError("thumb too big"));
    }

    let fileName = thumb.name;
    let splittedFileName = fileName.split(".");
    let newFileName =
      "artwork_" +
      splittedFileName[0] +
      uuid() +
      "." +
      splittedFileName[splittedFileName.length - 1];

    thumb.mv(
      path.join(__dirname, "..", "/uploads", newFileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newArtwork = await Artwork.create({
            title,
            category,
            description,
            thumb: newFileName,
            creator: req.artist.id,
          });

          if (!newArtwork) {
            return next(new HttpError("Artwork cannot be created", 418));
          }

          const currentArtist = await Artist.findById(req.artist.id);
          const artistArtworkCount = currentArtist.artworks + 1;

          await Artist.findByIdAndUpdate(req.artist.id, {
            artworks: artistArtworkCount,
          });

          res.status(200).json(newArtwork);
        }
      }
    );
  } catch (err) {
    return next(new HttpError(err));
  }
};

const getArtworks = async (req, res, next) => {
  try {
    const artworks = await Artwork.find().sort({ updatedAt: -1 });
    res.status(200).json(artworks);
  } catch (err) {
    return next(new HttpError(err));
  }
};

const getArtwork = async (req, res, next) => {
  try {
    const artworkId = req.params.id;
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return next(new HttpError("Artwork not found", 404));
    }
    res.status(200).json(artwork);
  } catch (err) {
    return next(new HttpError(err));
  }
};

const getCatArtworks = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catArtworks = await Artwork.find({ category }).sort({
      createdAt: -1,
    });
    res.status(200).json(catArtworks);
  } catch (err) {
    return next(new HttpError(err));
  }
};

const getArtistArtwork = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artworks = await Artwork.find({ creator: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(artworks);
  } catch (err) {
    return next(new HttpError(err));
  }
};

const editArtwork = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, description } = req.body;
    const img = req?.files?.thumb;
    let updatedArtwork;

    if (!title || !category || description.length < 3) {
      return next(new HttpError("All fields are required", 418));
    }

    const artwork = await Artwork.findById(id);

    if (!artwork) {
      return next(new HttpError("Artwork not found", 404));
    }

    if (req.artist.id !== artwork.creator?.toString()) {
      return next(
        new HttpError("Artwork can not be updated due to not valid artist", 403)
      );
    }

    if (!img) {
      updatedArtwork = await Artwork.findByIdAndUpdate(
        id,
        { title, category, description },
        { new: true }
      );
    } else {
      if (img.size > 2000000) {
        return next(new HttpError("File is too large", 418));
      }

      fs.unlink(
        path.join(__dirname, "..", "/uploads", artwork.thumb),
        (error) => {
          if (error) {
            return next(new HttpError(error));
          }
        }
      );

      const fileName = img.name;
      const splittedFileName = fileName.split(".");
      const oriFileName = splittedFileName[0];
      const oriFileExt = splittedFileName[splittedFileName.length - 1];
      const newFileName = "artwork_" + oriFileName + uuid() + "." + oriFileExt;

      img.mv(
        path.join(__dirname, "..", "/uploads", newFileName),
        async (error) => {
          if (error) {
            return next(new HttpError(error));
          }
        }
      );

      updatedArtwork = await Artwork.findByIdAndUpdate(
        id,
        { title, category, description, thumb: newFileName },
        { new: true }
      );
    }

    if (!updatedArtwork) {
      return next(new HttpError("Artwork update failed", 418));
    }

    res.status(200).json(updatedArtwork);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const deleteArtwork = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new HttpError("Incorrect artwork id", 400));
    }

    const artwork = await Artwork.findById(id);

    if (!artwork) {
      return next(new HttpError("Artwork not found", 404));
    }

    if (req.artist.id !== artwork.creator?.toString()) {
      return next(
        new HttpError("Artowrk can not be deleted due to not valid artist", 403)
      );
    }

    const fileName = artwork.thumb;

    fs.unlink(path.join(__dirname, "..", "/uploads", fileName), (error) => {
      if (error) {
        return next(new HttpError(error));
      }
    });

    const deletedArtwork = await Artwork.findByIdAndDelete(id);

    if (!deletedArtwork) {
      return next(new HttpError("Artwork deletion failed", 418));
    }

    const artist = await Artist.findById(req.artist.id);

    if (!artist) {
      return next(new HttpError("Artist not found", 404));
    }

    const newPostCount = artist.artworks - 1;
    const updatedArtist = await Artist.findByIdAndUpdate(req.artist.id, {
      artworks: newPostCount,
    });

    if (!updatedArtist) {
      return next(new HttpError("Artist update failed", 418));
    }

    res.status(204).json();
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  uploadArtwork,
  getArtworks,
  getArtwork,
  getArtistArtwork,
  getCatArtworks,
  editArtwork,
  deleteArtwork,
};
