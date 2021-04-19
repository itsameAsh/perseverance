const prefixSchema = require("../../schemas/prefix-schema")
const mongo = require(`../../mongo`);
const botconfig = require(`../../botconfig.json`)
const index = require('../../index.js')

const cache = {} // id

module.exports = {
    commands: [`prefix`, `setprefix`],
    description: "Set custom prefix",
    expectedArgs: `<prefix>`,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    minArgs: 1,
    maxArgs:1,
    callback: (message, arguments, text) => {
        changePrefix(message)
    },
    permissions: `ADMINISTRATOR`,
    requireRoles: [],
    ownerOnly: false
}

async function changePrefix(message){
    const { member, channel, content, guild} = message;

    let prefix = content;
    const split = prefix.split(` `)
    split.shift()
    prefix = split.join(` `)


    cache[guild.id] = [prefix]

    await mongo().then(async (mongoose) => {
        try {
            await prefixSchema.findOneAndUpdate({
                _id: guild.id
            }, {
                _id: guild.id,
                prefix,
            }, {
                upsert: true
            })
        }finally {
            mongoose.connection.close()
        }
    })
    message.channel.send("Updated prefix")
}