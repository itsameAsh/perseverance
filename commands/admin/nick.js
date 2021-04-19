module.exports = {
    commands: [`nick`],
    description: "This changes the bots nickname.",
    expectedArgs: `<nickname>`,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text) => {
        message.guild.me.setNickname(message.content.slice(1).replace(`nick `, ''));
    },
    permissions: [`ADMINISTRATOR`],
    OwnerOnly: true
}