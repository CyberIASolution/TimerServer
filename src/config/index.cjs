const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const ORG = process.env.ORG;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

module.exports = { PORT, HOST, ORG };
module.exports.supabase = {
  URL: SUPABASE_URL,
  KEY: SUPABASE_KEY,
};
