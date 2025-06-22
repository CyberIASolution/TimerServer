const { assignTimer } = require("../models/Timer.cjs");

function init(socket) {
  socket.on("register", registerSocket);

  function registerSocket({ id }) {
    if (id) assignTimer(id, socket);
    else socket.emit("error", "Missing ID");
  }
}

module.exports = { init };
