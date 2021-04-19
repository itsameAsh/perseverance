const fs = require(`fs`);

module.exports = {
    commands: [`logs`],
    description: "This allows you to do edit logs.",
    expectedArgs: `<clear>`,
    permissionError: `You need "BOT_OWNER" permissions to run this command`,
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        
        if(arguments[0] === "clear"){
            message.channel.send("Clearing logs!");
            fs.writeFileSync(`text.log`, "");
        }
    },
    OwnerOnly: true
}