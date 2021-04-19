const Discord = require("discord.js");

module.exports = {
    commands: [`info`,`stats`],
    description: "This will show more technical bot infomation.",
    expectedArgs: `<component>`,
    permissionError: `You need "ADMIN" permissions to run this command`,
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, bot, botconfig) => {

        let totalSeconds = (bot.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        let memUsed = process.memoryUsage().heapUsed / 1024 / 1024;

        botinfo = [`**Bot Version**: ${botconfig.ver}`,`**Bot Prefix**: ${botconfig.prefix}`,`**Guilds Size**: ${bot.guilds.cache.size}`,`**Memory Usage**: ${Math.round(memUsed * 100) / 100} MB` ,`**Bot Uptime**: ${uptime}`]

        let infoEmbed = new Discord.MessageEmbed()
        .setTitle("**__Technical Info__**")
        .setDescription("This is bot info")
        .setColor("Red")
        .addField("__**Bot Info**__", botinfo)

        message.channel.send(infoEmbed);
    },
}