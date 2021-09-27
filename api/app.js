const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const movieRoutes = require("./routes/movies-routes");
const listRoutes = require("./routes/lists-routes");

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection succesful"))
  .finally(() => {
    app.listen(8800, () => {
      console.log("Backend server is running");
    });
  })
  .catch((err) => console.log("Kon niet verbinden met database", err));
