const { bot } = require("../..")

module.exports = {
    commands: [`filter`],
    description: "sets playback filters",
    expectedArgs: "3d, bassboost, echo, karaoke, nightcore, vaporwave, flanger, gate, haas, reverse, surround, mcompand, phaser, tremolo, earwax",
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text) => {
        if(!message.member.voice.channel) return message.channel.send("Please enter a voice channel first!")
        if (["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "flanger", "gate", "haas", "reverse", "surround", "mcompand", "phaser", "tremolo", "earwax"].includes(arguments[0])) {
            let filter = bot.distube.setFilter(message, arguments);
            message.channel.send("Current queue filter: " + (filter || "Off"));
        }

    },
    permissions: ``,
    requireRoles: [],
    ownerOnly: false
}