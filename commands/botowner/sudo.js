module.exports = {
    commands: [`sh`, `shell`],
    description: "This gives shell access.",
    expectedArgs: `<command>`,
    permissionError: `You need "BOT_OWNER" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text) => {
        const splitOptions = {
            maxLength: 2000,
            prepend: '\`\`\`',
            append: '\`\`\`'
        }
        // msgString = message.content.slice(4);
        msgString = text;
        const exec = require('child_process').exec;
        const child = exec(`${msgString}`,
            (error, stdout, stderr) => {
            message.channel.send(`\`\`\`${stdout}\`\`\``, {split: splitOptions});
            // message.channel.send(`stderr: \`\`\`${stderr}\`\`\``);
        if (error !== null) {
            message.channel.send(`exec error: \`\`\`${error}\`\`\``);
        }

});
    },
    OwnerOnly: true
}