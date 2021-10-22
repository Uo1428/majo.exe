const { MessageEmbed } = require("discord.js");
const sql = require("../../utilities/database");

module.exports = async (client, oldMessage, newMessage) => {
 try {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + oldMessage.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    await oldMessage.guild.channels.fetch();
    const logsetup = await results[0].res;
    const log = await oldMessage.guild.channels.cache.find((c) => c.id == logsetup);
    if (oldMessage.channel.type === "dm") return;
    if (!oldMessage.guild.me.permissions.has("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    const event = await new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.edit} Unhandled Message Event`)
     .setColor("#4f545c")
     .setThumbnail(message.author.avatarURL())
     .setDescription(`Message \`${oldMessage.id}\` was edited but I couldn't find what was updated...`)
     .addField("Message link", `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
     .setTimestamp()
     .setFooter(message.guild.name, message.guild.iconURL());
    await log.send({ embeds: [event] });
   })();
  });
 } catch (err) {
  console.log(err);
 }
};
