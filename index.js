const Discord = require('discord.js');
const client = new Discord.Client();

const REACT_EMOJI = '👍';

const token = process.env.BOT_TOKEN

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageReactionAdd', async (reaction, user) => {
  // Check if the user is not a bot and the reaction is the specified emoji
  if (!user.bot && reaction.emoji.name === REACT_EMOJI) {
    try {
      // Get the DM channel for the user
      const channel = await user.createDM();
      // Send the message to the user
      await channel.send(`Hello ${user.username}, thank you for reacting with ${REACT_EMOJI}!`);
    } catch (error) {
      console.error(`Failed to send DM to user ${user.tag}: ${error}`);
    }
  }
});

client.login(token);