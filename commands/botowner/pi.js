module.exports = {
    commands: [`calpi`],
    description: "This calculates pi right there.",
    expectedArgs: ``,
    permissionError: `You need "BOT_OWNER" permissions to run this command`,
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        let i = 1n;
        let x = 3n * (10n ** 1020n);
        let pi = x;
        while (x > 0) {
        x = x * i / ((i + 1n) * 4n);
        pi += x / (i + 2n);
        i += 2n;
        }
        // console.log(pi / (10n ** 20n));
        message.channel.send(`\`\`\`${pi / (10n ** 20n)}\`\`\``);
    },
    OwnerOnly: true
}