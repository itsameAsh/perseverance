module.exports = {
    commands: [`delete`, `rm`],
    description: "This will delete messages by the bot.",
    expectedArgs: `<bot commands>`,
    permissionError: `You need "BOT_OWNER" permissions to run this command`,
    minArgs: 0,
    callback: (message, arguments, text, bot) => {
        // message.channel.fetchMessages()
        //     .then(messages => messages.array().forEach(
        //     message => message.author.equals(client.user) && message.delete()
        // ));
        message.channel.send("You SUX");
        if(message.author.id === "801417597970808882"){
            message.delete();
        }

    },
    OwnerOnly: true
}