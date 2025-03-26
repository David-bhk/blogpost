const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const PORT = 3000;

app.set("views engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  console.log(`blog post: ${title}\n${content}`);
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
