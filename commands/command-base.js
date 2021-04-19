const fsPath = require("fs-path");
const fs = require("fs");
// const { prefix } = require(`../botconfig.json`);
const botconfig = require(`../botconfig.json`);

const prefixSchema = require("../schemas/prefix-schema.js")
const logSchema = require("../schemas/messageLog-schema.js")
const mongo = require(`../mongo`);
const cache = {} // id

// let prefix = botconfig.prefix;

const validatePermissions = (permissions) => {
    const validPermissions = [
        `ADMINISTRATOR`,
        `CREATE_INSTANT_INVITE`,
        `KICK_MEMBERS`,
        `BAN_MEMBERS`,
        `MANAGE_CHANNELS`,
        `MANAGE_GUILD`,
        `ADD_REACTIONS`,
        `VIEW_AUDIT_LOG`,
        `VIEW_CHANNEL`,
        `READ_MESSAGES`,
        `SEND_MESSAGES`,
        `SEND_TTS_MESSAGES`,
        `MANAGE_MESSAGES`,
        `EMBED_LINKS`,
        `ATTACH_FILES`,
        `READ_MESSAGE_HISTORY`,
        `MENTION_EVERYONE`,
        `USE_EXTERNAL_EMOJIS`,
        `EXTERNAL_EMOJIS`,
        `CONNECT`, // Voice Channel
        `SPEAK`,
        `MUTE_MEMBERS`,
        `DEAFEN_MEMBERS`,
        `MOVE_MEMBERS`,
        `USE_VAD`, // Voice Auto Detection
        `CHANGE_NICKNAME`,
        `MANAGE_NICKNAMES`,
        `MANAGE_ROLES`,
        `MANAGE_ROLES_OR_PERMISSIONS`,
        `MANAGE_WEBHOOKS`,
        `MANAGE_EMOJIS`
    ]

    for (const permission of permissions){
        if(!validPermissions.includes(permission))
        throw new Error(`Unknown permission node "${permission}"`)
    }
}
module.exports = (bot, commandOptions, dir) => {
    let {
        commands,
        description = ``,
        expectedArgs = ``,
        permissionError = `You do not have permission to run this command.`,
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        memberIDs = [],
        callback,
        OwnerOnly = false,
    } = commandOptions

    if(typeof commands === `string`) {
        commands = [commands]
    }

    console.log(`Registering command "${commands[0]}" with description: ${description}`)
    // fs.appendFileSync(`commands.data`, `**${prefix}${commands[0]}**: ${description}\n`)
    fs.appendFileSync(`./data/${dir.slice(9)}.data`, `**${commands[0]}**: ${description}\n`)


    if(permissions.length){
        if(typeof permissions === `string`){
            permissions = [permissions]
        }

        validatePermissions(permissions);
    }

    const splitOptions = {
        maxLength: 2000,
        prepend: '```',
        append: '```'
    }

    bot.on(`message`, message => {
        if(message.channel.type === "dm") return;
        const { member, content, guild } = message

        checkData(guild)

        async function checkData(guild){
            await mongo().then(async mongoose => {
                    let data = await prefixSchema.findOne({_id: guild.id})

                    if(data) prefix = data.prefix
                    if(!data) prefix = botconfig.prefix
                    commandHandle(prefix)
            })
        }
        
        
        async function messageLog(message){
            const { member, channel, content, guild} = message;

            let prefix = content;
            const split = prefix.split(` `)
            split.shift()
            prefix = split.join(` `)


            cache[guild.id] = [prefix]

            await mongo().then(async (mongoose) => {
                try {
                    await messageLogSchema.findOneAndUpdate({
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








        async function commandHandle(prefix){

            for (const alias of commands) {
                if(content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)){
                    
                    if(message.author.id !== botconfig.ownerID){
                        if(OwnerOnly === false){
                            // message.channel.send("OnlyOwner False")
                            for(const permission of permissions){
                                if(!member.hasPermission(permissions)){
                                    message.channel.send(`\`\`\`${message.author.username}: ${permissionError}\`\`\``)
                                    return;
                                }
                            }
                            //test for require roles
                            for(const  requiredRole of requiredRoles){
                                const role = guild.roles.cache.find(role => role.name === requiredRole)

                                if(!role || !member.roles.cache.has(role.id)){
                                    message.channel.send(`You must have the "${requiredRole}" role to use this command.`)
                                    return;
                                }
                            }
                                        // message.channel.send("Bot Owner")
                        } else if(message.author.id != botconfig.ownerID){
                            message.channel.send(permissionError)
                            return;
                        }    
                    }
                    
                    //test for required perms 

                    const arguments = content.split(/[ ]+/)

                    arguments.shift()

                    if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)){
                        message.channel.send(`\`\`\`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}\`\`\``)
                        return;
                    }

                    callback(message, arguments, arguments.join(' '), bot, botconfig)
                    return;
                }
            }
        }
    })





}