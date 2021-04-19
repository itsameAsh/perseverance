const Discord = require("discord.js");

module.exports = {
    commands: 'ping',
    description: "Returns with server and api ping.",
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, bot) => {
        // message.reply("Pong!")
        // message.channel.send(`\`\`\`Latency is ${Date.now() - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(bot.ws.ping)}ms\`\`\``);

        const pingEmbed = new Discord.MessageEmbed()
	    .setColor('RED')
	    .addFields(
            { name: '**__Latency__**', value: `${Date.now() - message.createdTimestamp}ms` },
            { name: '**__API Latency__**', value: `${Math.round(bot.ws.ping)}ms`, inline: true },
	    )
	    .setTimestamp()
	    .setFooter('Totally not a security risk');

        message.channel.send(pingEmbed);
    },
}