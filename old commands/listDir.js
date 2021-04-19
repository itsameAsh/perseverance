const fsPath = require('fs-path');

module.exports = {
    commands: [`lsd`,`listdir`],
    description: "This will list all directory's in directory.",
    expectedArgs: `<directory>`,
    permissionError: `You need "BOT_OWNER" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text) => {
        const splitOptions = {
            maxLength: 2000,
            prepend: '```',
            append: '```'
        }
        fsPath.find(arguments[0], function(err, list){
            fsDirs = list.dirs.join(`\n`);
            
            message.channel.send(`\`\`\`${fsDirs}\`\`\``, { split: splitOptions})
        })
    },
    OwnerOnly: true
}