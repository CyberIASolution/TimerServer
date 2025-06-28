const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const { register, auth } = require("./controllers/sessionController.cjs");
const { init, setting } = require("./controllers/userController.cjs");
const { ORG, PORT } = require("./config/index.cjs");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ORG, methode: ["GET", "POST"] }
});

init(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: ORG }));

app.post("/setting", setting);
app.post("/register", register);
app.post("/auth", auth);

module.exports = httpServer;
