const { bot } = require("../..")

module.exports = {
    commands: [`pause`],
    description: "pauses playback",
    expectedArgs: ``,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    minArgs: 0,
    maxArgs:0,
    callback: (message, arguments, text) => {
        if(!message.member.voice.channel) return message.channel.send("Please enter a voice channel first!")
        bot.distube.pause(message);
        message.react("⏸️")
        // message.channel.send("paused!");

    },
    permissions: ``,
    requireRoles: [],
    ownerOnly: false
}