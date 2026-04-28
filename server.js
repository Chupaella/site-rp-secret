const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/main.js", (req, res) => {
  res.sendFile(path.join(__dirname, "main.js"));
});

app.use("/style", express.static(path.join(__dirname, "public", "style")));
app.use("/pages", express.static(path.join(__dirname, "public", "pages")));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "src", "data", "users.json"), "utf8")
  );

  if (users[username] && users[username].password === password) {
    res.redirect("/pages/terminal.html");
  } else {
    res.send("Accès refusé");
  }
});

app.listen(PORT, () => console.log("Serveur lancé sur le port " + PORT));
