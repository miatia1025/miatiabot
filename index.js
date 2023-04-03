const { Client, GatewayIntentBits, Partials ,Events } = require('discord.js'); 
const { EmbedBuilder } = require('discord.js');
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessageReactions
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});


const app = express();


// dot env
require('dotenv').config();
const channel_id = process.env.CHANNEL_ID;
const token = process.env.BOT_TOKEN;
const guild_id = process.env.GUILD_ID;
const public_key = process.env.PUBLIC_KEY;

const pinningReact = "1090831468869197824"; // ControlDog
const deletionReact = "❌";

client.on("ready", () =>{
    console.log("waked up");
})

// For Guild Messages
client.on(Events.MessageReactionAdd, async (reaction, user) => {
    // 0
    console.log("-------------------")	
    
    // おまじない
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}

    // A. Ignoreing Bot Part
    if(reaction.message.author.bot && user.id == client.application.id){
        //console.log(`reaction.message.author.bot = ${reaction.message.author.bot}`);
        //console.log(`reaction.message.author.id = ${user.id}`);
        //console.log(`client.application.id = ${client.application.id}`);

        return;
    }
    
    // B0. Initialize
    const isCustom = reaction.emoji.id !== null;
    let pinningInvoke = false;
    
    // B1. Judge Pinning Flag
    if (isCustom){
        console.log(`${reaction.message.author.username} / ${reaction.message.author.id}`);
        console.log(`reacted with ${reaction.emoji.identifier}`);
        
        pinningInvoke = (reaction.emoji.id == pinningReact);
        
        console.log(`reaction.emoji.id = ${reaction.emoji.id}`);
        console.log(`pinningReact = ${pinningReact}`);
    }else{
        console.log(`${reaction.message.author.username} / ${reaction.message.author.id}`);
        console.log(`reacted with ${reaction.emoji.name}`);
        
        pinningInvoke = (reaction.emoji.name == pinningReact);
        
        console.log(`reaction.emoji.name = ${reaction.emoji.name}`);
        console.log(`pinningReact = ${pinningReact}`);
    }
    
    // B3. Show flags
    console.log(`pinningInvoke : ${pinningInvoke}`);
    
    // C0. Judge Flags
    if(pinningInvoke){    
        if(reaction.message.guild.id == guild_id && reaction.message.channelId == channel_id){
            
            // get server icon url and a alternative
            server_icon = reaction.message.guild.iconURL()
            
            if (server_icon==null){
                server_icon = "https://raw.githubusercontent.com/miatia1025/miatiabot/main/img/noimg_1.png"
            }
            
            // get user reacted
            console.log(user.username)
            console.log(user.id)
            
            // get reacted user
            console.log(reaction.message.author.username)
            console.log(reaction.message.author.id)
            
            const emb = new EmbedBuilder()
            .setColor(0x00FFFF)
            .setAuthor({ name: `${reaction.message.author.username +'#'+ reaction.message.author.discriminator}`, iconURL: `${reaction.message.author.displayAvatarURL(reaction.message.author.avatar)}`})
            .setThumbnail(server_icon)
            .setDescription(`${reaction.message.toString()}`)
            .addFields({ name: '\u200B', value: `[▷ Jump](${reaction.message.url})`, inline: true })
            .setTimestamp()
            .setFooter({ text: `#${reaction.message.channel.name}`, iconURL: server_icon })
            
            msg = reaction.message.channel.send({embeds: [emb]})
            .then(async(msg) => {
                await msg.react(deletionReact);
            });
            
            dm = client.users.send(user.id, {embeds: [emb]})
            .then(async(dm) => {
                await dm.react(deletionReact);
            });
        };
    };
});

// For DMs
client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if(user.id == client.application.id){
        return;
    }

    // おまじない
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
    
    // Deletion Message Part
    const isCustom = reaction.emoji.id !== null;
    let deletionInvoke = false;
    
    if (isCustom){
        deletionInvoke = (reaction.emoji.id == deletionReact);
    }else{
        deletionInvoke = (reaction.emoji.name == deletionReact);
    }
    console.log(`deletionInvoke : ${deletionInvoke}`);
    
    if (reaction.message.author.id == client.application.id && deletionInvoke){
        reaction.message.delete();
    };
    
});


client.login(token);

app.post('/interactions', verifyKeyMiddleware(public_key), async (req, res) => {

});

app.get('/', async (req,res) =>{
    return res.send('Follow documentation ')
});
