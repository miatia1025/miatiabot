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

client.on("messageReactionAdd", (reaction, user) => {

    if(reaction.message.guild.id == guild_id && reaction.message.channelId == channel_id){
        
        console.log(user)
        console.log(user.id)
        
        const emb = new EmbedBuilder()
            .setColor(0x00FFFF)
            .setURL("https://qiita.com/nedew/items/4e0c20c1a89e983a6992")
            .setAuthor({ name: 'miatiabot#999999', iconURL: 'https://cdn.discordapp.com/attachments/1049901014238629888/1086588696800804914/03237-_Fav_loliNJVA_sita_mix_nsfwa2a39461759ca083e45fdc9b64e37a2c1edb06cc.png'})
            .setThumbnail('https://cdn.discordapp.com/icons/1086300372827652236/20f2d95656ae58bc53d1a341aef8cc1e.webp?size=96')
            .setDescription('Sorry, I was a little bit occupied lately. I tried to integrate this extension with multidiffusion, but it is already functional in another one, so I stopped updating, you may want to check this out\nhttps://github.com/pkuliyi2015/multidiffusion-upscaler-for-automatic1111')
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