// 0.import area
const { EmbedBuilder } = require('discord.js');


function createEmbeds(reaction, user){
    // Set server icon
    server_icon = reaction.message.guild.iconURL()

    if (server_icon==null){
        server_icon = "https://raw.githubusercontent.com/miatia1025/miatiabot/main/img/noimg_1.png"
    }

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

    return embeds;
}

module.exports = {
    createEmbeds
}