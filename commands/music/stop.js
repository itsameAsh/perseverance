const { bot } = require("../..")

module.exports = {
    commands: [`stop`],
    description: "stop currently playing",
    expectedArgs: ``,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    minArgs: 0,
    maxArgs:0,
    callback: (message, arguments, text) => {
        if(!message.member.voice.channel) return message.channel.send("Please enter a voice channel first!")
        bot.distube.stop(message);
        message.react("⏹️")
        // message.channel.send("Stopped the music!");

    },
    permissions: ``,
    requireRoles: [],
    ownerOnly: false
}