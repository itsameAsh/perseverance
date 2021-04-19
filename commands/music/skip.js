const { bot } = require("../..")

module.exports = {
    commands: [`skip`],
    description: "skips currently playing",
    expectedArgs: `<number of songs to skip>`,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    callback: (message, arguments, text) => {
        if(!message.member.voice.channel) return message.channel.send("Please enter a voice channel first!")
        bot.distube.skip(message);
        message.react("⏭️")
        // message.channel.send("Skipped!")
    },
    permissions: ``,
    requireRoles: [],
    ownerOnly: false
}