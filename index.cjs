const app = require("./src/app.cjs");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const ORG = process.env.ORG;

const server = app(ORG);
server.listen(PORT, () => {
    console.log(`Server started at ${HOST}:${PORT}`);
})
