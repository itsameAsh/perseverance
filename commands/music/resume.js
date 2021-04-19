const { bot } = require("../..");
const messageLogSchema = require("../../schemas/messageLog-schema");

module.exports = {
    commands: [`resume`],
    description: "resumes playback",
    expectedArgs: ``,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    minArgs: 0,
    maxArgs:0,
    callback: (message, arguments, text) => {
        if(!message.member.voice.channel) return message.channel.send("Please enter a voice channel first!")
        bot.distube.resume(message);
        message.react("▶️")
        // message.channel.send("resumed!");

    },
    permissions: ``,
    requireRoles: [],
    ownerOnly: false
}