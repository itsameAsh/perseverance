const { bot } = require("../..")

module.exports = {
    commands: [`queue`],
    description: "shows music queue",
    expectedArgs: `<Music>`,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    callback: (message, arguments, text) => {
        let queue = bot.distube.getQueue(message);
        if(!queue) return message.channel.send("No queue.")
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    },
    permissions: ``,
    requireRoles: [],
    ownerOnly: false
}