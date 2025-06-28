const { assignSocket } = require("../models/User.cjs");
const { updateMinuteCost } = require("../models/Account.cjs");

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

async function setting(req, res, next) {
    const id = req.body.userId;
    const minuteCost = req.body.minuteCost;

    await updateMinuteCost(id, minuteCost);
    res.status(200);
    res.end();
}

module.exports = { init, setting };
