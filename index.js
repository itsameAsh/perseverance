const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const process = require("process");
const DisTube = require("distube");
const fs = require(`fs`);
const path = require(`path`);
const mongo = require('./mongo')
const welcomeSchema = require("./schemas/welcome-schema");
const app = require('express')();
const express = require(`express`);
const http = require('http').Server(app);
const io = require('socket.io')(http);

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '41.216.184.136',
  user     : 'ashtonst_remote',
  password : 'kA+4LhCyA7^n',
  database : 'ashtonst_discord',
  // port: '2083',
  debug: true
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
 
const bot = new Discord.Client({disableEveryone: true});
bot.setMaxListeners(25)

bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// fs.writeFileSync(`commands.data`,"");
fs.writeFileSync(`./data/admin.data`,"");
fs.writeFileSync(`./data/general.data`,"");
fs.writeFileSync(`./data/misc.data`,"");
fs.writeFileSync(`./data/botowner.data`,"");
fs.writeFileSync(`./data/config.data`,"");
fs.writeFileSync(`./data/music.data`,"");
fs.writeFileSync(`./data/serverList.list`, "");
fs.writeFileSync(`./data/chache.log`, "");


bot.distube
    .on("playSong", (message, queue, song) => {
      const Embed = new Discord.MessageEmbed()
	    .setColor('GREY')
	    .setDescription(`Playing ${song.name} - ${song.formattedDuration} [${song.user}]`)
      message.channel.send(Embed)
    })
    .on("addSong", (message, queue, song) => {
      const Embed = new Discord.MessageEmbed()
	    .setColor('GREY')
	    .setDescription(`Added ${song.name} - ${song.formattedDuration} [${song.user}]`)
      message.channel.send(Embed)
    })
    .on("playList", (message, queue, playlist, song) => {
      const Embed = new Discord.MessageEmbed()
	    .setColor('GREY')
	    .setDescription(`Playing **${playlist.name}** playlist (${playlist.songs.length} songs). [${song.user}]\nNow playing ${song.name} - ${song.formattedDuration}`)
      message.channel.send(Embed)
    })
    .on("addList", (message, queue, playlist) => {
      const Embed = new Discord.MessageEmbed()
	    .setColor('GREY')
	    .setDescription(`Added ${playlist.name} playlist (${playlist.songs.length} songs)`)
      message.channel.send(Embed)
    })

bot.on("ready", async () => {
  
    // console.log(`${bot.user.username} is online on ${bot.guilds.size} server(s)!`);
    bot.user.setActivity(`${botconfig.status}`, {type: "PLAYING"})
    functionCommands()

    await mongo().then(mongoose =>{
      try {
        console.log('connected to mongo!')
      } finally {
        mongoose.connection.close()
      }

    })

    bot.guilds.cache.forEach(guild =>{
      console.log(`${guild.name} | ${guild.id}`)
      io.emit('server', `${guild.name} | ${guild.id}`)
      fs.appendFileSync("./data/serverList.list", `${guild.name} | ${guild.id}\n`)

    })


});

//webserver

app.get('/', (req, res) => {
  app.use(express.static(__dirname + '/public'));
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      recieveMsg(msg)
    });
  io.emit('server',"Connection!")
  
  var serverList = fs.readFileSync("./data/serverList.list").toString().split("\n")
  var messageChache = fs.readFileSync("./data/chache.log").toString().split("\n")
  serverList.forEach(server =>{
    // console.log(server)
    io.emit('server', server)
  })
  messageChache.forEach(line =>{
    io.emit('chat message', line)
  })
  });


http.listen(3000, () => {
  console.log('listening on *:3000');
});





//webserver

process.stdin.resume();
process.stdin.setEncoding('utf-8');

process.stdin.on('data', msg => {
  recieveMsg(msg);
  process.stdin.resume();
  
});


bot.on("message", async message => {
    // if(message.author.bot ) return;
    if(message.channel.type === "dm") return;
    if(message.channel.id === `802177768766963784`) return;

    let messageArray = message.content.toLowerCase().split(" ");
    let messageArraycs = message.content;
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let argscs = messageArraycs.slice(9);


      //logs
      spyAuthor = message.author.username;
      spySentMessage = message.content;
      spyTime = message.createdAt;
      spyChannel = message.channel;
      spyContent = (`time:${spyTime} | Channel:${spyChannel} | ${spyAuthor}: ${spySentMessage}`);
      // message.channel.send(`time:${timestamp}, ${author}: ${sentMessage}`)
      if(message.channel.id === `664567209799974922`){
        fs.appendFileSync(`./server.log`, `${spyContent}\n`)
      } else if (message.channel.id != `664567209799974922`){
        fs.appendFileSync('./text.log', `${spyContent}\n`);
        console.log(spyContent);
        msg = message.content;
        author = message.author.username;
        time = spyTime;
        recieveMsg(msg, author, time, message);
      }
      //logs


    });

    //functions

    function functionCommands() {
      bot.login(botconfig.token);

      const baseFile = `command-base.js`;
      const commandBase = require(`./commands/${baseFile}`);

      const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files){
          const stat = fs.lstatSync(path.join(__dirname, dir, file))
          if (stat.isDirectory()) {
            readCommands(path.join(dir, file))
          } else if (file !== baseFile) {
            const option = require(path.join(__dirname, dir, file))
            // console.log(`${dir} :  ${file}`)
            commandBase(bot, option, dir)
          }
        }
      }
  
  
      readCommands(`commands`);
    }
    let lastChannel = "565835525911609345";
    function recieveMsg(msg, author, time, message){
      serverName = "CONSOLE"
      channelName = "CONSOLE"
      if(message){
        serverName = message.guild.name;
        channelName = message.channel.name;
        lastChannel = message.channel.id;
      }
      if(!author){
        author = "admin";
        if(msg.startsWith("/last")){
          console.log("Last")
          io.emit('chat message', `CONSOLE | ${author}: ${msg}`);
          bot.channels.cache.get(lastChannel).send(msg.slice(6));
          return;
        }
      }

      io.emit('chat message', `${time} | ${serverName} : ${channelName} | ${author}: ${msg}`)
      if(author === "admin"){
        // bot.channels.cache.get(`571626167904501760`).send(msg);
      }else{
        fs.appendFileSync('./data/chache.log', `${time} | ${serverName} : ${channelName} | ${author}: ${msg}\n`)
      }
    
    }







exports.bot = bot;


process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});






bot.login(botconfig.token);