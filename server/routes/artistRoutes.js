const { Router } = require("express");

const {
  registerArtist,
  loginArtist,
  getArtist,
  changeAvatar,
  editArtist,
  getArtists,
} = require("../controllers/artistControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.post("/register", registerArtist);
router.post("/login", loginArtist);
router.get("/:id", getArtist);
router.get("/", getArtists);
router.post("/change-avatar", authMiddleware, changeAvatar);
router.patch("/edit-artist", authMiddleware, editArtist);

module.exports = router;
