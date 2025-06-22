const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const Timer = require("./controllers/TimerController.cjs");

module.exports = function (origin) {
  const corsOpt = {
    origin,
    methods: ["GET", "POST"],
  };

  const app = express();
  const server = createServer(app);
  const io = new Server(server, { cors: corsOpt });
  io.on("connection", Timer.init);

  app.use(cors(corsOpt));
  app.get("/status", (req, res) => {
    res.status(200);
    res.end();
  });

  return server;
};
