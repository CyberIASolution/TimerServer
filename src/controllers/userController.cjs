const { createUser, assignSocket } = require("../models/User.cjs");

function init(io) {
    io.on("connection", (socket) => {
        socket.on("register", (data) => {
            data = JSON.parse(data);

            if (!data || !data.userId || !data.timerId) {
                socket.emit("register:error", "Missing userId or timerId");
                return;
            }

            assignSocket(data["userId"], data["timerId"], socket);
        })
    })
}

module.exports = { init };
