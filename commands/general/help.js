const Discord = require("discord.js");
const fs = require("fs");
const commandBase = require("../command-base");



module.exports = {
    commands: [`help`,`?`],
    description: `This will show the help menu.`,
    expectedArgs: `<Category> (NCI)`,
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments, text, bot, botconfig) => {
        
        let args = message.content
        const split = args.split(` `)
        split.shift()
        args = split.join(` `)


        let genCom = fs.readFileSync(`./data/general.data`);
        let miscCom = fs.readFileSync(`./data/misc.data`);
        let adminCom = fs.readFileSync(`./data/admin.data`);
        let configCom = fs.readFileSync(`./data/config.data`)
        let botCom = fs.readFileSync(`./data/botowner.data`)

        if(!args){
            let totalSeconds = (bot.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
            let memUsed = process.memoryUsage().heapUsed / 1024 / 1024;

            botinfo = [`**Bot Version**: ${botconfig.ver}`,`\n**Bot Prefix**: ${prefix}`,`\n**Memory Usage**: ${Math.round(memUsed * 100) / 100} MB` ,`\n**Bot Uptime**: ${uptime}`]
            const helpEmbed = new Discord.MessageEmbed()
            .setColor('ORANGE')
            .setTitle('**__HELP MENU__**')
            // .setURL('https://discord.js.org/')
            .setAuthor('A General Bot')
            .setDescription('Here is a list of all avalible commands / basic bot info.')
            // .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: '**__Bot Info__**', value: `${botinfo}` },
                // { name: '\u200B', value: '\u200B' },
                { name: '**__General Commands__**', value: genCom, inline: true },
                { name: '**__Misc Commands__**', value: miscCom, inline: true },
                { name: '**__Admin Commands__**', value: adminCom, inline: true },
            )
            .setTimestamp()
            .setFooter('Totally not a privacy risk');

            message.channel.send(helpEmbed);
        } else if(args){
            if(args === "help") return message.channel.send(fs.readdirSync(`./data/`))
            if(!fs.existsSync(`./data/${args}.data`)) return message.channel.send("Specified category does not exist!")
            let specCom = fs.readFileSync(`./data/${args}.data`)
           



            const Embed = new Discord.MessageEmbed()
	    .setColor('ORANGE')
	    .setTitle('**__HELP MENU__**')
	    .setAuthor('A General Bot')
	    .setDescription('Specific Command Category\'s')
	    .addFields(
            { name: `**__${args.toUpperCase()}__**`, value: `${specCom}` },
	    )
	    .setTimestamp()
	    .setFooter('Totally not a privacy risk');

            message.channel.send(Embed)
        }
        



    },
    permissions: ``,
    requireRoles: []
}