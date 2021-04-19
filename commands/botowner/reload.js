// readCommands = require("D:/Projects/Alfred/index.js")
module.exports = {
    commands: [`reload`,`rl`],
    expectedArgs: `<num1>`,
    permissionError: `You need "BOT_OWNER" permissions to run this command`,
    minArgs: 0,
    callback: (message, arguments, text, functionCommands) => {
        // message.channel.send("Reloading all commands.1")
    },
    permissions: ``,
    requireRoles: [],
    ownerOnly: true
}