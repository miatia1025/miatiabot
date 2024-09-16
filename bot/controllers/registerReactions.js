import { slashReacts } from "../constants.js";

const registerReactions = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const commands = slashReacts[interaction.commandName];
    if (commands) {
      await commands(interaction);
    }
  });
};

export default registerReactions;
