const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connect("mongodb://localhost/myCV");

const db = mongoose.connection;

db.on("error", (e) => console.error(e));
db.once("open", () => console.log("Ansulten via mongoose"));

app.get("/", function (req, res) {
  res.send("Hello World");
});


app.use(express.json());
app.use(cors());
const coursesRouter = require('./routes/courses');
app.use('/courses', coursesRouter);

app.listen(3000, () => {
  console.log(`server started at http://localhost:3000`);
});
