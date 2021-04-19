module.exports = {
    commands: [`template`, `temp`],
    description: "This allows you to do edit logs.",
    expectedArgs: `<num1> <num2>`,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    minArgs: 1,
    maxArgs:0,
    callback: (message, arguments, text) => {
        
    },
    permissions: `ADMINISTRATOR`,
    requireRoles: [],
    ownerOnly: false
}