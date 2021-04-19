const { bot } = require("../..")

module.exports = {
    commands: [`play`],
    description: "plays music",
    expectedArgs: `<Music>`,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text) => {
        if(!message.member.voice.channel) return message.channel.send("Please enter a voice channel first!")
        bot.distube.play(message, arguments.join(" "));
    },
    permissions: ``,
    requireRoles: [],
    ownerOnly: false
}