import { Client, Events, GatewayIntentBits } from "discord.js";
import registerReactions from "./controllers/registerReactions.js";

const iHateClientOnIndex = (token, appId) => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}`);
  });

  registerReactions(client);

  return client;
};

export default iHateClientOnIndex;
