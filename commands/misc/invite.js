module.exports = {
    commands: [`invite`,`inv`],
    description: "Invite me to your server!",
    expectedArgs: `<num1>`,
    permissionError: `You need "General" permissions to run this command`,
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, bot,botconfig) => {
        message.channel.send(`Use this to invite me to your server. ${botconfig.invite}`)
    },
    permissions: ``,
    requireRoles: []
}