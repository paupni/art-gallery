const { Router } = require("express");

const {
  registerArtist,
  loginArtist,
  getArtist,
  changeAvatar,
  editArtist,
  getArtists,
} = require("../controllers/artistControllers");

const router = Router();

// router.get("/", (req, res, next) => {
//   res.json("This the artist route");
// });

router.post("/register", registerArtist);
router.post("/login", loginArtist);
router.get("/:id", getArtist);
router.get("/", getArtists);
router.post("/change-avatar", changeAvatar);
router.patch("/edit-artist", editArtist);

module.exports = router;
