// 0.import area
const { Client, GatewayIntentBits, Partials ,Events, messageLink } = require('discord.js'); 
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

// 0. create client area
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

// 0. read dot env area
if (fs.existsSync('.env')) {
    require('dotenv').config();
};
const channel_id = process.env.CHANNEL_ID;
const token = process.env.BOT_TOKEN;
const guild_id = process.env.GUILD_ID;

const pinningReact = process.env.PINNING_EMOJI;
const deletionReact = "❌";

// 0. On ready function
//// it shows all channel ids from [guild_id] your terminal
client.on("ready", async () =>{
    // A. Hello to terminal
    console.log("waked up");
    console.log(`Logged in as ${client.user.tag}`);

    // B-0. Get guild
    const guild = client.guilds.cache.get(guild_id);
    
    // B-1. Hello to discord
    //const channel = client.channels.cache.get(channel_id);
    //channel.send('起きた');
    
    // C-0. Initialization for showing all ids
    const fetchChannels = guild.channels.cache.sort((a, b) => a.createdAt - b.createdAt);

    // C-1. Get Ids.
    const ids = fetchChannels.map(info => `${info.id}`)
    const names = fetchChannels.map(info => `${info.name}`)
    const results = Object.fromEntries(ids.map((id, i) => [id, names[i]]));

    // D. Show Ids
    console.log(results);
    console.log(ids);
});

// 1. Functions in reactionAdd on guild messages
//// 
client.on(Events.MessageReactionAdd, async (reaction, user) => {
    
    // A. Fetch old reactions (Copied and Pasted Code >_<)
	if (reaction.partial) {
        /// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
            await reaction.fetch();
		} catch (error) {
            console.error('Something went wrong when fetching the message:', error);
			/// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
    
    // B. show borderline on console for its appearance
    console.log("-------------------")
    
    // C. Quit when both of message and reactions is mine
    if(reaction.message.author.bot && user.id == client.application.id){
        return;
    }
    
    // D-0. Set some flags and initial flags
    const isCustom = reaction.emoji.guild !== null;
    const hasEmbed = typeof reaction.message.embeds[0] !== 'undefined' ? true : false;
    let isGuild = false;
    let pinningInvoke = false;
    
    // D-1. Set pinning flag ${pinningInvoke}
    if (isCustom){

        console.log(`${user.username} / ${user.id}`);
        console.log(`reacted with ${reaction.emoji.identifier}`);
        
        pinningInvoke = (reaction.emoji.id == pinningReact);
        
        console.log(`reaction.emoji.id = ${reaction.emoji.id}`);
        console.log(`pinningReact = ${pinningReact}`);
    }else{
        // If ${user} reacted custom emoji, reaction.emoji has no identifier propety
        console.log(`${reaction.message.author.username} / ${reaction.message.author.id}`);
        console.log(`reacted with ${reaction.emoji.name}`);
        
        pinningInvoke = (reaction.emoji.name == pinningReact);
        
        console.log(`reaction.emoji.name = ${reaction.emoji.name}`);
        console.log(`pinningReact = ${pinningReact}`);
    }
    
    // X. Show ${pinningInvoke} for debug
    console.log(`pinningInvoke : ${pinningInvoke}`);
    
    // D-2. Create and send the reacted message as embeds
    if(pinningInvoke){
        // D2-0. Is on guild?
        try{
            isGuild = typeof reaction.message.guild.id ? true : false;
        }catch{
            isGuild = false;
        };
        
        // D2-1. If is the message on guild, create and send embeds
        if(isGuild){
            
            // D21-0. Area limitation with ${guild_id}
            if(reaction.message.guild.id == guild_id){
                
                // X. Show reaction sender infomations
                console.log(user.username)
                console.log(user.id)
                
                // X. Show reaction receiver infomations
                console.log(reaction.message.author.username)
                console.log(reaction.message.author.id)
                
                ///// D210-0. Set HARDCODED channel selector /////
                //////////////////////////////////////////////////
                const hardChannel = client.channels.cache.get(channel_id);
                const useHardChannel = true;
                //////////////////////////////////////////////////

                
                // D210-0. Get or set server icon
                server_icon = reaction.message.guild.iconURL()

                if (server_icon==null){
                    server_icon = "https://raw.githubusercontent.com/miatia1025/miatiabot/main/img/noimg_1.png"
                }

                // D210-1. Create and receive embeds
                if(hasEmbed){

                    // D2101-1. Create new embeds
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
    
                    // D2101-1. ...and set thumbnail if it has images
                    if (reaction.message.attachments.size > 0) {
                        const urls = reaction.message.attachments.map((attachment) => attachment.url);
                        emb.setImage(urls[0]);
                    }

                    // D2101-2. Receive embeds from the reacted message
                    getEmbs = reaction.message.embeds

                    copiedEmbs = getEmbs.map(emb =>{
                        const newEmb = new EmbedBuilder(emb);
                        newEmb.setColor(0x4a708d);
                        return newEmb;
                    });

                    // D2101-3. Append original and received embeds
                    const embs = [emb, ...copiedEmbs];

                    // D2101-4. Send embeds!
                    
                    /*
                    // To channel
                    msg = hardChannel.send({embeds: embs})
                        .then(async(msg) => {
                            await msg.react(deletionReact);
                    });
                    /*/
                    //*/

                    // To direct message
                    dm = client.users.send(user.id, {embeds: embs})
                        .then(async(dm) => {
                        await dm.react(deletionReact);
                    });
                    
                }

                // D210-2. Create and send embeds
                else if(useHardChannel){

                    // D2102-1. Create embeds
                    const emb = new EmbedBuilder()
                        .setColor(0x00FFFF)
                        .setAuthor({ name: `${reaction.message.author.username +'#'+ reaction.message.author.discriminator}`, iconURL: `${reaction.message.author.displayAvatarURL(reaction.message.author.avatar)}`})
                        .setThumbnail(server_icon)
                        .setDescription(`${reaction.message.toString()}\u200B`)
                        .addFields({ name: '\u200B', value: `[▷ Jump](${reaction.message.url})`, inline: true })
                        .setTimestamp()
                        .setFooter({ text: `#${reaction.message.channel.name}`, iconURL: server_icon })
    
                    // D2102-2. Get images and set thumbnail
                    if (reaction.message.attachments.size > 0) {
                        const urls = reaction.message.attachments.map((attachment) => attachment.url);
                        emb.setImage(urls[0]);
                    }
    
                    // D2102-3. Send embeds!
                    /*
                    // To channel
                    msg = hardChannel.send({embeds: [emb]})
                        .then(async(msg) => {
                            await msg.react(deletionReact);
                    });
                    /*/
                    //*/

                    // To direct message
                    dm = client.users.send(user.id, {embeds: [emb]})
                        .then(async(dm) => {
                        await dm.react(deletionReact);
                    });
                        
                }
                // D210-3. For sending the same channel to the message
                else{

                    // Not implemented ><

                };
            };
        };
    };
});

// 2. Functions on DMs
////
client.on(Events.MessageReactionAdd, async (reaction, user) => {
    
    // A. Fetch old reactions (Copied and Pasted Code >_<)
	if (reaction.partial) {
        /// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
            await reaction.fetch();
		} catch (error) {
            console.error('Something went wrong when fetching the message:', error);
			/// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}

    // B. Quit if reactions from myself
    if(user.id == client.application.id){
        return;
    }
    
    // C. Set some flags
    // ...why I had write anothe way to specify isCustom
    const isCustom = /^<a?:.+:\d+>$/.test(reaction.emoji.identifier);
    //const isCustom = reaction.emoji.guild !== null;
    let deletionInvoke = false;
    
    // D. Set ${deletionInvoke} with specific emoji
    if (isCustom){
        deletionInvoke = (reaction.emoji.id == deletionReact && reaction.message.author.id == client.application.id);
    }else{
        deletionInvoke = (reaction.emoji.name == deletionReact && reaction.message.author.id == client.application.id);
    }

    // X. Show ${deletionInvoke}
    console.log(`deletionInvoke : ${deletionInvoke}`);
    
    // D. Deletion the message reacted with ${deletionReact}
    if (reaction.message.author.id == client.application.id && deletionInvoke){
        try{
            await reaction.message.fetch();
            await reaction.message.delete();
        }catch(error){
            console.log("Missing!");
            console.log(error);
        }
    };
    
});

// 3. Message embeds
////
client.on(Events.MessageCreate, async (message) =>{
    try{
        console.log(message.content);
    }catch(e){
        return;
    };

    const discordUrlPattern = /https?:\/\/(?:[a-z]+\.)?discord\.com\/channels\/[0-9]+\/[0-9]+\/[0-9]+/g;
    const twitterUrlPattern = /https?:\/\/twitter\.com\/.+/g;

    const msgContent = message.content.toString();

    let discordUrls = msgContent.match(discordUrlPattern);
    let twitterUrls = msgContent.match(twitterUrlPattern);

    if(discordUrls || twitterUrls){
        console.log("received special urls");
    }else{
        return;
    }

    console.log(`discordUrls : ${discordUrls}`);
    console.log(`twitterUrls : ${twitterUrls}`);

    const hasDiscordMessageUrls = discordUrls !== null && discordUrls.length > 0;
    const hasTwitterMessageUrls = twitterUrls !== null && twitterUrls.length > 0;
    if (hasTwitterMessageUrls){

        fxUrls = twitterUrls.map(url => url.replace("twitter.com", "fxtwitter.com"));
        console.log(`fxUrls : ${fxUrls}`)

        let channel = message.channel;
        fxMsg = channel.send(fxUrls.toString().replace(/,/g, "\n"))
    }

    if(hasDiscordMessageUrls){
        console.log(`${message.author.tag} : Sent message link!`);
        
        // Create embeds
        let embeds = []
        
        for (let i = 0; i < discordUrls.length; i++){
            const ids = discordUrls[i].match(/\d+/g)
            const msg = await client.channels.cache.get(ids[1])?.messages.fetch(ids[2]).catch(err => null) ?? null
            
            // D210-0. Get or set server icon
            let server_icon = msg.guild.iconURL()
            
            if (server_icon==null){
                server_icon = "https://raw.githubusercontent.com/miatia1025/miatiabot/main/img/noimg_1.png"
            }
            
            const hasEmbed = typeof msg.embeds[0] !== 'undefined' ? true : false;

            if(hasEmbed){
                // D2101-1. Create new embeds
                const emb = new EmbedBuilder()
                    .setColor(0x00FFFF)
                    .setTitle(`__Resend from Here__`)
                    .setURL(`${message.url}`)
                    .setAuthor({ name: `${message.author.username +'#'+ message.author.discriminator}`, iconURL: `${message.author.displayAvatarURL(message.author.avatar)}`})
                    .setThumbnail(server_icon)
                    .setDescription(`${message.toString()}\u200B`)
                    .addFields({ name: '\u200B', value: `[▷ Jump](${message.url})`, inline: true })
                    .setTimestamp()
                    .setFooter({ text: `#${message.channel.name}`, iconURL: server_icon })

                // D2101-1. ...and set thumbnail if it has images
                if (message.attachments.size > 0) {
                    const discordUrls = message.attachments.map((attachment) => attachment.url);
                    emb.setImage(discordUrls[0]);
                }
                // D2101-2. Receive embeds from the reacted message
                getEmbs = msg.embeds

                copiedEmbs = getEmbs.map(emb =>{
                    const newEmb = new EmbedBuilder(emb);
                        newEmb.setColor(0x4a708d);             
                        return newEmb;
                });

                // D2101-3. Append original and received embeds
                embeds = [emb, ...copiedEmbs];

            }else{

                // D2102-1. Create embeds
                const emb = new EmbedBuilder()
                    .setColor(0x00FFFF)
                    .setAuthor({ name: `${msg.author.username +'#'+ msg.author.discriminator}`, iconURL: `${msg.author.displayAvatarURL(msg.author.avatar)}`})
                    .setThumbnail(server_icon)
                    .setDescription(`${msg.toString()}\u200B`)
                    .addFields({ name: '\u200B', value: `[▷ Jump](${msg.url})`, inline: true })
                    .setTimestamp()
                    .setFooter({ text: `#${msg.channel.name}`, iconURL: server_icon })
                
                // D2102-2. Get images and set thumbnail
                if (msg.attachments.size > 0) {
                    const attachUrls = msg.attachments.map((attachment) => attachment.url);
                    emb.setImage(attachUrls[0]);
                }
                
                embeds.push(emb);
            }
        };
        
        const usrChannel = message.channel
        
        try{
            sendMsg = usrChannel.send({embeds: embeds})
                .then(async(dm) => {
                await dm.react(deletionReact);
            });

            console.log(embeds);
        }catch(e){
            console.log(e);
        };

        return;
    };
        
})

// 4. launch client!
////
client.login(token);