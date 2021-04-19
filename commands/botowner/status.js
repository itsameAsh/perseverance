module.exports = {
    commands: [`status`],
    expectedArgs: `<Status>`,
    permissionError: `You need "ADMIN" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text, bot) => {
        bot.user.setActivity(`${text}`, {type: "PLAYING"})
        message.channel.send(`**Now playing**: ${text}`)
    },
    // permissions: `ADMINISTRATOR`,
    OwnerOnly: true,
    requireRoles: []
}