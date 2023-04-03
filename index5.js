
const { Client, GatewayIntentBits } = require('discord.js'); 

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});


// dot env
//require('dotenv').config();
const channel_id = process.env.CHANNEL_ID;
const token = process.env.BOT_TOKEN;
const guild_id = process.env.GUILD_ID;


client.on('ready', async () => {
    // initialize
    const guild = client.guilds.cache.get(guild_id);
    console.log(`Logged in as ${client.user.tag}`);
    
    // 起動確認用
    const channel = client.channels.cache.get(channel_id);
    channel.send('起きた');
    
    // get channels
    const fetchChannels = guild.channels.cache.sort((a, b) => a.createdAt - b.createdAt);

    const ids = fetchChannels.map(info => `${info.id}`)
    const names = fetchChannels.map(info => `${info.name}`)

    const results = Object.fromEntries(ids.map((id, i) => [id, names[i]]));

    // show ids
    console.log(results);
    console.log(ids);
});


client.login(token);

