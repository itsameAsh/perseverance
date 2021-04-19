module.exports = {
    commands: [`memovr`],
    description: "This causes the bot to crash due to mem over.",
    expectedArgs: `<num1> <num2>`,
    permissionError: `You need "ADMIN" permissions to run this command`,
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        
    },
    OwnerOnly: true
}