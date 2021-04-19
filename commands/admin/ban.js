const Discord = require("discord.js");


module.exports = {
    commands: [`ban`,`permban`],
    description: "bans a user.",
    expectedArgs: `<@user> <reason>`,
    permissionError: `You need "BAN_MEMBERS" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text) => {
        let member = message.mentions.members.first();
        let reason = arguments.slice(1).join(' ')
        if(member.bannable){
            member.ban({
                reason: `Banned by ${message.author.username} for reason: ${reason}`
            })
            const banEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('**BANNED**')
            .setDescription(`Banned by ${message.author.username} \nFrom Server: ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: '**Reason**', value: `${reason}` },
                { name: `**Time**`, value: `Indefinate`}
            )
        message.channel.send(banEmbed);
        member.send(banEmbed)
        } else if(!member.bannable) {
            message.channel.send("sorry that user is too powerfull for me!")
        }
    },
    permissions: `BAN_MEMBERS`,
    requireRoles: [],
    ownerOnly: false
}