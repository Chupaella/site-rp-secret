const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: "Method Not Allowed",
    };
  }

  const body = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";
  const form = new URLSearchParams(body);
  const username = form.get("username");
  const password = form.get("password");
  const usersPath = path.join(process.cwd(), "src", "data", "users.json");
  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

  if (users[username] && users[username].password === password) {
    return {
      statusCode: 302,
      headers: { Location: "/pages/terminal.html" },
      body: "",
    };
  }

  return {
    statusCode: 401,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: "Accès refusé",
  };
};
