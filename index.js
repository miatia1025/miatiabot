const { Client, GatewayIntentBits, DMChannel } = require('discord.js'); 

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ] 
});

// dot env
require('dotenv').config();
const channel_id = process.env.CHANNEL_ID;
const token = process.env.BOT_TOKEN;
const guild_id = process.env.GUILD_ID;

client.on('messageReactionAdd', (reaction, message, user) => {
    
    console.log(reaction);
    console.log(message);
    console.log(user);

    console.log("Reaction recieved");
})


client.login(token)