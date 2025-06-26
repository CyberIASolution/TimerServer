const server = require("./src/app.cjs");
const { HOST, PORT } = require("./src/config/index.cjs");

const url = HOST+":"+PORT;
server.listen(PORT, () => {
    console.log("Started: "+url);
})
