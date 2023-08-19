const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const taskRoutes = require("./routes/routes");

const app = express();

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;

//app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/taskManagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
