const Discord = require("discord.js");


module.exports = {
    commands: [`kick`],
    description: "Kick a user.",
    expectedArgs: `<@user> <reason>`,
    permissionError: `You need "KICK_MEMBERS" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text) => {
        let member = message.mentions.members.first();
        let reason = arguments.slice(1).join(' ')
        if(member.kickable){
            member.kick()
            const kickEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('**Kicked**')
            .setDescription(`Kicked by ${message.author.username} \nFrom Server: ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: '**Reason**', value: `${reason}` },
            )
        message.channel.send(kickEmbed);
        member.send(kickEmbed)
        } else if(!member.kickable) {
            message.channel.send("sorry that user is too powerfull for me!")
        }
    },
    permissions: `KICK_MEMBERS`,
    requireRoles: [],
    ownerOnly: false
}