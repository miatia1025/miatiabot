const { Client, GatewayIntentBits, Partials ,Events } = require('discord.js'); 
const { EmbedBuilder } = require('discord.js');
///const express = require('express');
const { verifyKeyMiddleware } = require('discord-interactions');
const fs = require('fs');


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


///const app = express();


// dot env
if (fs.existsSync('.env')) {
    require('dotenv').config();
};
const channel_id = process.env.CHANNEL_ID;
const token = process.env.BOT_TOKEN;
const guild_id = process.env.GUILD_ID;
const public_key = process.env.PUBLIC_KEY;

const pinningReact = process.env.PINNING_EMOJI;
const deletionReact = "❌";

client.on("ready", async () =>{
    console.log("waked up");

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
})

// For Guild Messages
client.on(Events.MessageReactionAdd, async (reaction, user) => {
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
    
    // 0
    console.log("-------------------")	
    
    // A. Ignoreing Bot Part
    const isBot = typeof reaction.message.author.bot !== 'undefined' ? true : false;

    if(isBot && user.id == client.application.id){
        //console.log(`reaction.message.author.bot = ${reaction.message.author.bot}`);
        //console.log(`reaction.message.author.id = ${user.id}`);
        //console.log(`client.application.id = ${client.application.id}`);
        
        return;
    }
    
    // B0. Initialize
    const isCustom = reaction.emoji.guild !== null;
    const hasEmbed = typeof reaction.message.embeds[0] !== 'undefined' ? true : false;
    
    let isGuild = false;
    let pinningInvoke = false;
    
    // B1. Judge Pinning Flag
    if (isCustom){
        console.log(`${user.username} / ${user.id}`);
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
        try{
            isGuild = typeof reaction.message.guild.id ? true : false;
        }catch{
            isGuild = false;
        };
        
        if(isGuild){
            
            if(reaction.message.guild.id == guild_id){
                
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
                
                // channel selection for debug
                /////
                const hardChannel = client.channels.cache.get(channel_id);
                const useHardChannel = true;
                const embeds = [];
                
                if(hasEmbed){
                    // create new embeds
                    const emb = new EmbedBuilder()
                        .setColor(0x00FFFF)
                        .setTitle(`__Resend from Here__`)
                        .setURL(`${reaction.message.url}`)
                        .setAuthor({ name: `${reaction.message.author.username +'#'+ reaction.message.author.discriminator}`, iconURL: `${reaction.message.author.displayAvatarURL(reaction.message.author.avatar)}`})
                        .setThumbnail(server_icon)
                        .setDescription(`${reaction.message.toString()}\u200B`)
                        .addFields({ name: '\u200B', value: `[▷ Jump](${reaction.message.url})`, inline: true })
                        .setTimestamp()
                        .setFooter({ text: `#${reaction.message.channel.name}`, iconURL: server_icon })
    
                    if (reaction.message.attachments.size > 0) {
                        const urls = reaction.message.attachments.map((attachment) => attachment.url);
                        emb.setImage(urls[0]);
                    }

                    // fetch existing embeds
                    getEmbs = reaction.message.embeds

                    copiedEmbs = getEmbs.map(emb =>{
                        const newEmb = new EmbedBuilder(emb);
                        newEmb.setColor(0x4a708d);
                        return newEmb;
                    });

                    // append those embeds
                    const embs = [emb, ...copiedEmbs];

                    // Send!
                    /*
                    msg = hardChannel.send({embeds: embs})
                        .then(async(msg) => {
                            await msg.react(deletionReact);
                    });
                    */
                    dm = client.users.send(user.id, {embeds: embs})
                        .then(async(dm) => {
                        await dm.react(deletionReact);
                    });
                    
                }else if(useHardChannel){
                    // create a embed
                    const images = reaction.message.attachments.images
                    const emb = new EmbedBuilder()
                        .setColor(0x00FFFF)
                        .setAuthor({ name: `${reaction.message.author.username +'#'+ reaction.message.author.discriminator}`, iconURL: `${reaction.message.author.displayAvatarURL(reaction.message.author.avatar)}`})
                        .setThumbnail(server_icon)
                        .setDescription(`${reaction.message.toString()}\u200B`)
                        .addFields({ name: '\u200B', value: `[▷ Jump](${reaction.message.url})`, inline: true })
                        .setTimestamp()
                        .setFooter({ text: `#${reaction.message.channel.name}`, iconURL: server_icon })
    
                    // get images
                    if (reaction.message.attachments.size > 0) {
                        const urls = reaction.message.attachments.map((attachment) => attachment.url);
                        emb.setImage(urls[0]);
                    }
    
                    // Send!
                    /*
                    msg = hardChannel.send({embeds: [emb]})
                        .then(async(msg) => {
                            await msg.react(deletionReact);
                    });
                    */
                    dm = client.users.send(user.id, {embeds: [emb]})
                        .then(async(dm) => {
                        await dm.react(deletionReact);
                    });
                        
                };
            };
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
    const isCustom = /^<a?:.+:\d+>$/.test(reaction.emoji.identifier);
    let deletionInvoke = false;
    
    if (isCustom){
        deletionInvoke = (reaction.emoji.id == deletionReact && reaction.message.author.id == client.application.id);
    }else{
        deletionInvoke = (reaction.emoji.name == deletionReact && reaction.message.author.id == client.application.id);
    }
    console.log(`deletionInvoke : ${deletionInvoke}`);
    
    try{
        if (reaction.message.author.id == client.application.id && deletionInvoke){
            await reaction.message.fetch();
            await reaction.message.delete();
        }else{
            return;
        }
    }catch(error){
        console.log("Missing!");
        console.log(error);
    };    
});

client.login(token);



///app.post('/interactions', verifyKeyMiddleware(public_key), async (req, res) => {
///
///});

///app.get('/', async (req,res) =>{
///    return res.send('Follow documentation ')
///});
