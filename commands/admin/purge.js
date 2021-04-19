module.exports = {
    commands: [`purge`],
    description: "Deletes specified amount of messages.",
    expectedArgs: `<Amount> <User?>`,
    permissionError: `You need "MANAGE_MESSAGES" permissions to run this command`,
    minArgs: 1,
    maxArgs:1,
    callback: (message, arguments, text) => {
        message.channel.bulkDelete(arguments[0], true)
    },
    permissions: `MANAGE_MESSAGES`,
    requireRoles: [],
    ownerOnly: false
}