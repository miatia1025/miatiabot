const { Client, GatewayIntentBits, DMChannel } = require('discord.js'); 
const { EmbedBuilder } = require('discord.js');
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ] 
});


const app = express();


// dot env
require('dotenv').config();
const channel_id = process.env.CHANNEL_ID;
const token = process.env.BOT_TOKEN;
const guild_id = process.env.GUILD_ID;
const public_key = process.env.PUBLIC_KEY

client.on("ready", () =>{
    console.log("waked up");
})

client.on("messageReactionAdd", (reaction, user) => {

    if(reaction.message.guild.id == guild_id && reaction.message.channelId == channel_id){
        
        console.log(user)
        console.log(user.id)
        console.log(user.avatar)
        console.log(user.avatarURL(user.avatar))
        console.log(user.defaultAvatarURL)
        console.log(user.displayAvatarURL(user.avatar))
        console.log(reaction.message.guild.iconURL())

        const hard_guild = client.guilds.cache.get("1086300372827652236")
        console.log(hard_guild.iconURL())
        
        const emb = new EmbedBuilder()
            .setColor(0x00FFFF)
            .setURL("https://qiita.com/nedew/items/4e0c20c1a89e983a6992")
            .setAuthor({ name: `${user.username +'#'+ user.discriminator}`, iconURL: `${user.avatarURL(user.avatar)}`})
            .setThumbnail("https://cdn.discordapp.com/icons/1086300372827652236/20f2d95656ae58bc53d1a341aef8cc1e.webp?size=96")
            .setDescription(`${reaction.message.toString()}`)
            .addFields({ name: '\u200B', value: '[▷ Jump](https://example.com)', inline: true })
            .setTimestamp()
            .setFooter({ text: '#💭雑談', iconURL: 'https://cdn.discordapp.com/icons/1086300372827652236/20f2d95656ae58bc53d1a341aef8cc1e.webp?size=96' });

        
        const exampleEmbed = new EmbedBuilder().setTitle('Some title');
        exampleEmbed.setColor(0x7289DA);

        reaction.message.channel.send({embeds: [emb]})
        
        //client.users.send(user.id, {embeds: [emb]})
        //const member = reaction.message.guild.members.fetch(user.id)
        

    }
})


client.login(token)

app.post('/interactions', verifyKeyMiddleware(public_key), async (req, res) => {

})

setInterval(() => {
    http.get('https://miatiabot.cyclic.app/');
  }, 1800000);


app.get('/', async (req,res) =>{
    return res.send('Follow documentation ')
})

app.listen(8999, () => {

})