const welcomeSchema = require("../../schemas/welcome-schema.js")
const mongo = require(`../../mongo`);
const index = require('../../index.js')

const cache = {} // id

module.exports = {
    commands: [`setwelcome`, `sw`],
    description: "This will set the welcome message (if Enabled).",
    expectedArgs: `<#welcome-channel> <message> | optional: <@> will ping user, If no channel is added will use this channel.`,
    permissionError: `You need "ADMINISTRATOR" permissions to run this command`,
    minArgs: 1,
    callback: (message, arguments, text, bot, botconfig) => {

        welcome(message)

    },
    permissions: `ADMINISTRATOR`,
    requireRoles: [],
    // OwnerOnly: true
}


index.bot.on(`guildMemberAdd`, member =>{
    onJoin(member)
})
index.bot.on('message', message =>{
    if(message.content === '!simjoin'){
        let member = message.member
        onJoin(member)
    }
})


async function onJoin(member){
        const { guild } = member

        let data = cache[guild.id]

        if(!data) {
            await mongo().then(async mongoose => {
                try{
                const result = await welcomeSchema.findOne({_id: guild.id})

                cache[guild.id] = data = [result.channelId, result.text]
                } finally {
                mongoose.connection.close()
                }
            })
        }
        const channel = guild.channels.cache.get(data[0])
        channel.send(data[1].replace(/<@>/g, `<@${member.id}>`))
}





async function welcome(message){
    const { member, channel, content, guild} = message;
    // onJoin(member)

    channelId = channel.id

    let text = content;
    const split = text.split(` `)
    split.shift()
    if(split[0].startsWith('<#')){
      channelId = split[0].slice(2, -1)
      split.shift()  
    }  
    text = split.join(` `)


    cache[guild.id] = [channelId, text]





    await mongo().then(async (mongoose) => {
        try {
            await welcomeSchema.findOneAndUpdate({
                _id: guild.id
            }, {
                _id: guild.id,
                channelId,
                text,
            }, {
                upsert: true
            })
        }finally {
            mongoose.connection.close()
        }
    })
    message.channel.send("Updated welcome message!")
}