////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// To miatiabot user(it's me)
//
// IMPORTANT 
// There is some ""Temporary Disabled"" Code block
// if you wanna use the block, remove "return;" line
// This is important
//
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 0.import area
const { privateDecrypt } = require('crypto');
const { Client, GatewayIntentBits, Partials ,Events, Routes } = require('discord.js'); 
const { REST } = require('@discordjs/rest');
const { EmbedBuilder, Embed } = require('discord.js');
const fs = require('fs');

// 0. Define command names
const cmd_pnginfo = "PNG Info";
const cmd_report_user = "Report this user";
const cmd_report_msg = "Report this message";

// 0.import my functions
const miatialib = require('./funcs.js');


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
const guild_id_nan = process.env.GUILD_ID_NAN;
const client_id = process.env.CLIENT_ID;

const pinningReact = process.env.PINNING_EMOJI;
const pinningReactNan = process.env.PINNING_EMOJI_NAN;
const deletionReact = "❌";
const recreateReact = "⭕";
const infoReact = "🔍";
const infoReactRight = "🔎";

// miatia identify
let isMiatia = false;

// 0. rest init
const rest = new REST({ version: "10" }).setToken(token)

// 0. On ready function
//// it shows all channel ids from [guild_id] your terminal
client.on("ready", async () =>{
    // Z. miatialib import test
    miatialib.print_miatia();
    miatialib.print_hello();
    
    // A. Hello to terminal
    console.log("waked up");
    console.log(`Logged in as ${client.user.tag}`);
    
    // B-0. Get guild
    const guild = client.guilds.cache.get(guild_id);
    
    // B-1. Hello to discord
    //const channel = client.channels.cache.get(channel_id);
    //channel.send('起きた');

    
    // D-0. Initialization for showing all ids
    const fetchChannels = guild.channels.cache.sort((a, b) => a.createdAt - b.createdAt);
    
    // D-1. Get Ids.
    const ids = fetchChannels.map(info => `${info.id}`)
    const names = fetchChannels.map(info => `${info.name}`)
    const results = Object.fromEntries(ids.map((id, i) => [id, names[i]]));

    // E. Show Ids
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
        
        pinningInvoke = (reaction.emoji.id == pinningReact || reaction.emoji.id == pinningReactNan);
        
        console.log(`reaction.emoji.id = ${reaction.emoji.id}`);

        if(reaction.emoji.id == pinningReact){
            console.log(`pinningReact = ${pinningReact}`);
        }else if(reaction.emoji.id == pinningReactNan){
            console.log(`pinningReactNan = ${pinningReactNan}`);
        }
    }else{
        // If ${user} reacted custom emoji, reaction.emoji has no identifier propety
        console.log(`${reaction.message.author.username} / ${reaction.message.author.id}`);
        console.log(`reacted with ${reaction.emoji.name}`);
        
        pinningInvoke = (reaction.emoji.name == pinningReact || reaction.emoji.name == pinningReactNan);
        
        console.log(`reaction.emoji.name = ${reaction.emoji.name}`);

        if(reaction.emoji.id == pinningReact){
            console.log(`pinningReact = ${pinningReact}`);
        }else if(reaction.emoji.id == pinningReactNan){
            console.log(`pinningReactNan = ${pinningReactNan}`);
        }
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
            if(reaction.message.guild.id == guild_id || reaction.message.guild.id == guild_id_nan){
                
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
                let initEmbs = [];
                let copiedEmbs = [];

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

                    //// D2101-1-1. Create initial emb with attachments from refered message
                    if (reaction.message.attachments.size > 0) {
                        const attachUrls = reaction.message.attachments.map((attachment) => attachment.url);
                        
                        // D2101-1. Create resending embeds
                        for (let i = 0; i < reaction.message.attachments.size; i++){
                            const emb = new EmbedBuilder()
                                .setColor(0x00FFFF)
                                .setURL(`${reaction.message.url}`)
                                .setAuthor({ name: `${reaction.message.author.username +'#'+ reaction.message.author.discriminator}`, iconURL: `${reaction.message.author.displayAvatarURL(reaction.message.author.avatar)}`})
                                .setThumbnail(server_icon)
                                .setImage(`${attachUrls[i]}`)
                                .setDescription(`${reaction.message.toString()}\u200B`)
                                .addFields({ name: '\u200B', value: `[▷ Jump](${reaction.message.url})`, inline: true })
                                .setTimestamp()
                                .setFooter({ text: `#${reaction.message.channel.name}`, iconURL: server_icon });
                                
                            initEmbs.push(emb);
                        };

                        // try to send dm
                        try{
                            sendMsg = client.users.send(user.id, {embeds: initEmbs})
                                .then(async(dm) => {
                                await dm.react(deletionReact);
                            });
                
                            console.log(initEmbs);
                        }catch(e){
                            console.log(e);
                        };
                    }
                    // no attachments
                    else{
                        // D2102-1. Create embeds
                        const emb = new EmbedBuilder()
                            .setColor(0x00FFFF)
                            .setAuthor({ name: `${reaction.message.author.username +'#'+ reaction.message.author.discriminator}`, iconURL: `${reaction.message.author.displayAvatarURL(reaction.message.author.avatar)}`})
                            .setThumbnail(server_icon)
                            .setDescription(`${reaction.message.toString()}\u200B`)
                            .addFields({ name: '\u200B', value: `[▷ Jump](${reaction.message.url})`, inline: true })
                            .setTimestamp()
                            .setFooter({ text: `#${reaction.message.channel.name}`, iconURL: server_icon })

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
                }
                // D210-3. For sending the same channel to the message
                else{

                    // Not implemented ><

                };
            };
        };
    };
});

// 2. Functions for deletions and png infos
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

    /////////////////////////////////////////////////
    //// PNG Info Developing
    /////////////////////////////////////////////////
    let isMagnifier = false;
    let infoInvoke = false;


    if (isCustom){
        isMagnifier = reaction.emoji.id == infoReact || reaction.emoji.id == infoReactRight;
        infoInvoke = (isMagnifier && reaction.message.author.id == client.application.id);
    }else{
        isMagnifier = reaction.emoji.name == infoReact || reaction.emoji.name == infoReactRight;
        infoInvoke = (isMagnifier && reaction.message.author.id == client.application.id);
    }

    console.log(`infoInvoke => ${infoInvoke}`);
    console.log(`isMagnifier => ${isMagnifier}`);

    if(isMagnifier){
        
        console.log("isMagni!");
    }

    //const isCustom = reaction.emoji.guild !== null;
    let deletionInvoke = false;
    let embDeletionInvoke = false;
    let miatiaInvoke = false;
    
    // E1. Set master flag
    if(user.id == process.env.MIATIA){
        isMiatia = true;
    }else{
        isMiatia = false;
    }

    // D1. Set ${deletionInvoke} with specific emoji
    if (isCustom){
        deletionInvoke = (reaction.emoji.id == deletionReact && reaction.message.author.id == client.application.id);
        embDeletionInvoke = (reaction.emoji.id == deletionReact && reaction.message.author.id == user.id);
        miatiaEmbDeletionInvoke = (reaction.emoji.id == deletionReact && isMiatia);

        console.log(`miatiaEmbDeletionInvoke : ${miatiaEmbDeletionInvoke}`);
    }else{
        deletionInvoke = (reaction.emoji.name == deletionReact && reaction.message.author.id == client.application.id);
        embDeletionInvoke = (reaction.emoji.name == deletionReact && reaction.message.author.id == user.id);
        miatiaEmbDeletionInvoke = (reaction.emoji.name == deletionReact && isMiatia);

        console.log(`miatiaEmbDeletionInvoke : ${miatiaEmbDeletionInvoke}`);
    }

    // D2. Set ${recreateInvoke} with specific emoji
    if (isCustom){
        recreateInvoke = (reaction.emoji.id == recreateReact);
        miatiaRecreateInvoke = (reaction.emoji.id == recreateReact && isMiatia);

        console.log(`miatiaRecreateInvoke : ${miatiaRecreateInvoke}`)
    }else{
        recreateInvoke = (reaction.emoji.name == recreateReact);
        miatiaRecreateInvoke = (reaction.emoji.name == recreateReact && isMiatia);

        console.log(`miatiaRecreateInvoke : ${miatiaRecreateInvoke}`)
    }

    // X. Show ${deletionInvoke}
    console.log(`deletionInvoke : ${deletionInvoke}`);
    //console.log(`recreateInvoke : ${recreateInvoke}`);

    const isReply = reaction.message.reference && reaction.message.reference.messageId;
    

    if(reaction.message.author.id == client.application.id && deletionInvoke && isReply){
        try{
            const refMessage = await reaction.message.channel.messages.fetch(reaction.message.reference.messageId);;

            await reaction.message.fetch();
            await reaction.message.delete();
            await refMessage.suppressEmbeds(false);

        }catch(e){
            console.log(e);
            console.log("たぶんリプライ先の取得で失敗してる");
        };
    }
    // E2. Deletion the message reacted with ${deletionReact}
    else if (reaction.message.author.id == client.application.id && deletionInvoke && isReply == false || reaction.message.author.id == client.application.id && deletionInvoke && isMiatia){
        try{
            await reaction.message.fetch();
            await reaction.message.delete();
        }catch(error){
            console.log("Missing!");
            console.log(error);
        }
    }
    // E3. Revive embeds
    else if((reaction.message.author.id == user.id && recreateInvoke) || miatiaRecreateInvoke){
        try{
            reaction.message.suppressEmbeds(false)
            console.log("復活！");
        }catch(e){
            console.log(e);
        };
    }
    // E4. Suppress any embeds
    else if((reaction.message.author.id == user.id && embDeletionInvoke) || miatiaEmbDeletionInvoke){
        try{
            reaction.message.suppressEmbeds(true)
            console.log("消去！");
        }catch(e){
            console.log(e);
        }
    }
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
        console.log(message.embeds);

        fxUrls = twitterUrls.map(url => url.replace("twitter.com", "fxtwitter.com"));
        console.log(`fxUrls : ${fxUrls}`)

        // old tale, this bot used to send her message with channel.send()
        //let channel = message.channel;
        //////////////////////////
        // Temporary Disabled
        //////////////////////////
        return;
        fxMsg = message.reply(fxUrls.toString().replace(/,/g, "\n"))
            .then(async(dm) => {
                await dm.react(deletionReact);
            });

        try{
            await message.suppressEmbeds(true);
        }catch(e){
            console.log(e);
            console.log("たぶん\"Manage Messages\"の権限がbotにない")
        }
    }
    
    if(hasDiscordMessageUrls){
        ////////////////////////////
        // Temporary Disabled
        ////////////////////////////
        return;
        console.log(`${message.author.tag} : Sent message link!`);
        
        // Create embeds
        let embeds = [];
        let trial_embeds = [];

        // set target channel
        const usrChannel = message.channel
        
        for (let i = 0; i < discordUrls.length; i++){
            const ids = discordUrls[i].match(/\d+/g)
            const msg = await client.channels.cache.get(ids[1])?.messages.fetch(ids[2]).catch(err => null) ?? null
            
            let server_icon;
            // D210-0. Get or set server icon
            try{
                server_icon = msg.guild.iconURL()
            }catch(e){
                console.log(e);
                console.log("たぶん参照できない鯖のメッセージ")
                return;
            }
            
            if (server_icon==null){
                server_icon = "https://raw.githubusercontent.com/miatia1025/miatiabot/main/img/noimg_1.png"
            }
            
            const hasEmbed = typeof msg.embeds[0] !== 'undefined' ? true : false;
            
            // create empty arrays
            let initEmbs = []
            let copiedEmbs = []
            
            if(hasEmbed){               
                // D2101-2. Receive embeds from the reacted message
                let getEmbs = msg.embeds;

                //// D2101-1-1. Create initial emb with attachments
                if (msg.attachments.size > 0) {
                    const attachUrls = msg.attachments.map((attachment) => attachment.url);
                    
                    // D2101-1. Create resending embeds
                    for (let i = 0; i < message.attachments.size; i++){
                        const emb = new EmbedBuilder()
                            .setColor(0x00FFFF)
                            .setTitle(`__Resend from Here__`)
                            .setURL(`${msg.url}`)
                            .setAuthor({ name: `${msg.author.username +'#'+ msg.author.discriminator}`, iconURL: `${msg.author.displayAvatarURL(msg.author.avatar)}`})
                            .setThumbnail(server_icon)
                            .setImage(`${attachUrls[i]}`)
                            .setDescription(`${msg.toString()}\u200B`)
                            .addFields({ name: '\u200B', value: `[▷ Jump](${msg.url})`, inline: true })
                            .setTimestamp()
                            .setFooter({ text: `#${msg.channel.name}`, iconURL: server_icon });
                            
                            initEmbs.push(emb);
                            
                            // 
                            copiedEmbs = getEmbs.map(emb =>{
                                const newEmb = new EmbedBuilder(emb);
                                newEmb.setColor(0x4a708d);             
                                return newEmb;
                            });
                    };

                    try{
                        //sendMsg = usrChannel.send({embeds: embeds})
                        sendMsg = usrChannel.send({embeds: initEmbs})
                            .then(async(dm) => {
                            await dm.react(deletionReact);
                        });
            
                        console.log(embeds);
                    }catch(e){
                        console.log(e);
                    };


        
                    // D2101-3. Append original and received embeds
                    embeds = [...copiedEmbs];
                }
                //// D2101-1-2. Refered message has not attachments
                else{

                    // D2101-1. Create resending embeds
                    const emb = new EmbedBuilder()
                    .setColor(0x00FFFF)
                    .setTitle(`__Resend from Here__`)
                    .setURL(`${msg.url}`)
                    .setAuthor({ name: `${msg.author.username +'#'+ msg.author.discriminator}`, iconURL: `${msg.author.displayAvatarURL(msg.author.avatar)}`})
                    .setThumbnail(server_icon)
                    .setDescription(`${msg.toString()}\u200B`)
                    .addFields({ name: '\u200B', value: `[▷ Jump](${msg.url})`, inline: true })
                    .setTimestamp()
                    .setFooter({ text: `#${msg.channel.name}`, iconURL: server_icon });
                    
                    initEmbs.push(emb);
                    
                    copiedEmbs = getEmbs.map(emb =>{
                        const newEmb = new EmbedBuilder(emb);
                        newEmb.setColor(0x4a708d);             
                        return newEmb;
                    });
                    
                    // D2101-3. Append original and received embeds
                    embeds = [emb, ...copiedEmbs];
                }
                

                // Send!!
                try{
                    //sendMsg = usrChannel.send({embeds: embeds})
                    sendMsg = usrChannel.send({embeds: embeds})
                        .then(async(dm) => {
                        await dm.react(deletionReact);
                    });
        
                    console.log(embeds);
                }catch(e){
                    console.log(e);
                };

                // debug
                console.log(embeds);
                
            }
            // No embed message
            else{
                console.log("ここ通った？");
                //// D2101-1-1. Create initial emb with attachments from refered message
                if (msg.attachments.size > 0) {
                    const attachUrls = msg.attachments.map((attachment) => attachment.url);
                    
                    // D2101-1. Create resending embeds
                    for (let i = 0; i < msg.attachments.size; i++){
                        const emb = new EmbedBuilder()
                            .setColor(0x00FFFF)
                            .setTitle(`__Resend from Here__`)
                            .setURL(`${msg.url}`)
                            .setAuthor({ name: `${msg.author.username +'#'+ msg.author.discriminator}`, iconURL: `${msg.author.displayAvatarURL(msg.author.avatar)}`})
                            .setThumbnail(server_icon)
                            .setImage(`${attachUrls[i]}`)
                            .setDescription(`${msg.toString()}\u200B`)
                            .addFields({ name: '\u200B', value: `[▷ Jump](${msg.url})`, inline: true })
                            .setTimestamp()
                            .setFooter({ text: `#${msg.channel.name}`, iconURL: server_icon });
                            
                        initEmbs.push(emb);
                    };


                    // 
                    try{
                        sendMsg = usrChannel.send({embeds: initEmbs})
                            .then(async(dm) => {
                            await dm.react(deletionReact);
                        });
            
                        console.log(initEmbs);
                    }catch(e){
                        console.log(e);
                    };
                };
                
            };
        };
        

        return;
    };
        
})

// 4. command events handler
////
client.on(Events.InteractionCreate, async(interaction) =>{
    if(interaction.isMessageContextMenuCommand){
        if(interaction.commandName === cmd_pnginfo){
            console.log(`${interaction.user.tag} run ${cmd_pnginfo}!`);

            // if there are some images, get urls
            const srcUrls = interaction.targetMessage.attachments.map((attachment) => attachment.url);
            let info = miatialib.png_to_info();
            console.log(info);

            await interaction.reply({content: `You run ${cmd_pnginfo} command (Not implemented ><)!`, ephemeral: true})
        }else if(interaction.commandName === cmd_report_msg){
            console.log(`${interaction.user.tag} run ${cmd_report_msg}!`);

            await interaction.reply({content: `You run ${cmd_report_msg} command (Not implemented ><)!`, ephemeral: true})
        }
    }else if(interaction.isUserContextMenuCommand){
        if(interaction.commandName === cmd_report_user){
            console.log(`${interaction.user.tag} run ${cmd_report_user}!`);

            await interaction.reply({content: `You run ${cmd_report_user} command (Not implemented ><)!`, ephemeral: true})
        }
    }
});

// 5. launch client!
////
async function main(){
    //////////////////////////////////////////
    // 4-A. App Commands Declares for PNG info
    //////////////////////////////////////////
    // command types references 
    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    const commands = [
        {
            name: cmd_pnginfo,
            type: 3
        },
        {
            name: cmd_report_user,
            type: 2
        },
        {
            name: cmd_report_msg,
            type: 3
        },
    ];
    try{
        console.log("app comands initialize");
        await rest.put(Routes.applicationGuildCommands(client_id, guild_id), {
            body: commands,
        });
        client.login(token);
    }catch(e){
        console.log(e);
    }
}

main();