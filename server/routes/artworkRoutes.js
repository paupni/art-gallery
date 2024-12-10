const { Router } = require("express");

const {
  uploadArtwork,
  getArtworks,
  getArtwork,
  getArtistArtwork,
  getCatArtworks,
  editArtwork,
  deleteArtwork,
} = require("../controllers/artworkControllers");

const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.post("/", authMiddleware, uploadArtwork);
router.get("/", getArtworks);
router.get("/:id", getArtwork);
router.get("/artists/:id", getArtistArtwork);
router.get("/categories/:category", getCatArtworks);
router.patch("/:id", authMiddleware, editArtwork);
router.delete("/:id", authMiddleware, deleteArtwork);

module.exports = router;
