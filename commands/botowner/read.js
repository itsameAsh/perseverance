const fs = require(`fs`);
const fsPath = require('fs-path');

module.exports = {
    commands: [`read`],
    description: "This allows you to read files if given currect directory",
    expectedArgs: `<File DIR>`,
    permissionError: `You need "BOT_OWNER" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text, splitOptions) => {
        if(arguments[0] === "botconfig.json" || arguments[0] === "./botconfig.json" || arguments[0] === ".\\botconfig.json"){
            message.channel.send("Your not allowed to do that (Bot Token located inside) :face_with_symbols_over_mouth: ")
            return;
        }
        message.channel.send(arguments[0]);
        data = fs.readFileSync(arguments[0])
        message.channel.send(`\`\`\`${data}\`\`\``, { split: splitOptions})
    },
    OwnerOnly: true
}