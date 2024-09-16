// Import section

import registerSlash from "./utils/registerSlash.js";
import dotenv from "dotenv";

// lol
import iHateClientOnIndex from "./iHateClientOnIndex.js";

dotenv.config();

// Variables section
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.APP_ID;

// Main
const client = iHateClientOnIndex(TOKEN, CLIENT_ID);
await registerSlash();

client.login(TOKEN);
