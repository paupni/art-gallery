const { Router } = require("express");

const router = Router();

router.get("/", (req, res, next) => {
  res.json("This the artwork route");
});

module.exports = router;
