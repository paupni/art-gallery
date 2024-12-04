const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();

const artistRoutes = require("./routes/artistRoutes");
const artworkRoutes = require("./routes/artworkRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/artists", artistRoutes);
app.use("/api/artworks", artworkRoutes);

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI)
  .then(
    app.listen(5000, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    )
  )
  .catch((err) => {
    console.log(err);
  });
