const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const SECRET_KEY = "123456789";
const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return db.users.findIndex((user) => user.email === email && user.password === password) !== -1;
}

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const message = "Incorrect email or password";
    res.json({ message });
    return;
  }
  const access_token = createToken({ email, password });
  const user = db.users.filter((user) => user.email === email && user.password === password)[0];
  res.status(200).json({ access_token, user });
  return;
});

server.post("/auth", (req, res) => {
  try {
    const { user_id, access_token } = req.body;
    verifyToken(access_token);
    const user = db.users.filter((user) => user.id === user_id)[0];

    res.status(200).json(user);
    return;
  } catch (err) {
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log("Run Auth API Server");
});
