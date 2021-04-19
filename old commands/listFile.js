const fsPath = require('fs-path');

module.exports = {
    commands: [`lsf`],
    description: "This will list all files in directory.",
    expectedArgs: `<file directory>`,
    permissionError: `You need "BOT_OWNER" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text) => {
        const splitOptions = {
            maxLength: 2000,
            prepend: '```',
            append: '```'
        }
        fsPath.find(arguments[0], function(err, list){
        fsFiles = list.files.join(`\n`);
        message.channel.send(`\`\`\`${fsFiles}\`\`\``, { split: splitOptions})
        if(err){
            message.channel.send(err)
        }
        })
    },
    OwnerOnly: true
}