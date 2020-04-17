// premium verison
const http = require("http");
const express = require("express");
const app = express();
const db = require("quick.db");

app.get("/", (request, response) => 
        {
               response.sendStatus(200);
        });
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://fourth-mud-beat.glitch.me`);
}, 280000);

// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed, Util, Attachment } = require("discord.js");
const { YT_API_KEY, prefix, devs } = require("./config.js");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const arraySort = require('array-sort');
const i = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const guild = require("guild");
const dateFormat = require("dateformat"); //npm i dateformat
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyAGNnLemghWiD1xJKI9YnISxi1UOwZm5VE");
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
const Canvas = require("canvas");
const queue = new Map();
require('events').EventEmitter.defaultMaxListeners = 15;
var table = require("table").table;

const Discord = require("discord.js");

// codes

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(`Zawala ${prefix}help`, {type: "WATCHING"})
});

// ===================================[settings]=============================================

  client.on("message", message => {
  
         if(message.content === prefix + 'ping') {
           
         let start = Date.now(); message.channel.send('pong').then(message => { 
         const embed = new Discord.RichEmbed()
         .setColor(`#2086DC`)
         .setDescription(`Time Taken: **${Date.now() - start} ms**
         Discord API: **${client.ping.toFixed(0)} ms**`)
         .setFooter('API Ping ' + message.author.username, message.author.displayAvatarURL)
         .setAuthor(message.guild.name)
         .setTimestamp();
         message.edit(embed);

    });
        }
});          
            
         
// server info

  client.on("message", message => {
  
    if(message.content === prefix + "server") {
      
      let embed = new Discord.RichEmbed()
      .setAuthor("Guild Inforamation:", + message.guild.displayAvatarURL)
      .setColor(0x00AE86)
      .addField("Gulid Info:", `> Guild Name: ${message.guild.name}\n > Guild Owner: ${message.guild.owner}`)
      .addField("Guild Details:", `> Members: ${message.guild.members.size} | Online: ${message.guild.members.filter(c => c.presence.status !== "offline").size}\n > Channels: ${message.guild.channels.size}\n > Categories: ${message.guild.channels.filter(f => f.type === "category").size} | Text: ${message.guild.channels.filter(f => f.type === "text").size} | Voice: ${message.guild.channels.filter(f => f.type === "voice").size}`)

      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();

      message.channel.send(embed)

    }
  })
    
    
    
// help code

client.on("message", message => {

    if(message.content === prefix + "help") {

      let Dashboard = "Soon";
      let support = "https://discord.gg/86UPB66";
      let invite = "https://discordapp.com/api/oauth2/authorize?client_id=684471533799866526&permissions=3669056&scope=bot";

      let embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setDescription(`Commands List. You can know here the commands what's I'm using!`)
      .addField("General:", `> \`help\`, \`invites\`, \`topinvites\`, \`avatar\`, \`profile\` *** puplic**`)
      .addField("Games:", `> \`speed\`, \`flags\`, \`dismantle\`, \`quiz\`, \`math\`, \`xo\` *** premium**`)
      .addField("Administration:", `> \`ban\`, \`kick\`, \`unban\`, \`mute\`, \`unmute\`, \`createcolors\`, \`avatar banner\`, \`warn\`, \`lock\` \`unlock\`, \`clear\``)
      .addField("Music:", `> \`play\`, \`pause\`, \`shuffle\`, \`resume\`, \`queue\`, \`repeat\`, \`nowplaying\` *** puplic**`)
      .addField("Info:", `> \`botInfo\`, \`devs\`, \`server\`, \`ping\`, \`topservers\` *** puplic**`)
      .addField("Links:", `> [Dashboard](Soon) | [Support Server](${support}) | [Invite Link](${invite})`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.displayAvatarURL)

      message.channel.send(embed);
    }
});


// profile 

const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
var Jimp = require("jimp");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./profile.sqlite');
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

fs.readdir("./others/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./others/${f}`);
    console.log(`${f} loaded!`);
  });
});

bot.on("ready", async () => {
  const profile = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'profile';").get();
  if (!profile['count(*)']) {
    
    sql.prepare("CREATE TABLE profile (UserID TEXT PRIMARY KEY, GuildID TEXT, xp INTEGER, lvl INTEGER, coins INTEGER, bg INTEGER, note TEXT, likes INTEGER, rep INTEGER, w0 INTEGER, w1 INTEGER, w2 INTEGER, w3 INTEGER, w4 INTEGER, w5 INTEGER);").run();
  }
  const rep = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'rep';").get();
  if (!rep['count(*)']) {
    
    sql.prepare("CREATE TABLE rep (UserID, LikedUser TEXT PRIMARY KEY, GuildID TEXT, Time TEXT);").run();
  }
  const liked = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'liked';").get();
  if (!liked['count(*)']) {
    
    sql.prepare("CREATE TABLE liked (UserID, LikedUser TEXT PRIMARY KEY, GuildID TEXT, Time TEXT);").run();
  }

  const about = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'about';").get();
  if (!about['count(*)']) {
    
    sql.prepare("CREATE TABLE about (UserID TEXT PRIMARY KEY, career TEXT, age TEXT, club TEXT, model TEXT, study TEXT, future TEXT, life TEXT, words TEXT);").run();
  }

  
  bot.setInterval(() =>{
    let d = Date.now()
  
   let rep = sql.prepare(`SELECT * FROM rep`).all()
      if(!rep)return;
      for (var i = 0; i < rep.length ; i++){
        if(rep[i].Time < d){
          sql.prepare(`DELETE FROM rep WHERE UserID = '${rep[i].UserID}' AND Time = ${rep[i].Time}`).run();
          
        }
      }
  }, 5000)
  
});


function generateXp() {
  let min = 2
  let max = 7
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



bot.on("message", async message => {
if (message.author.bot) return;
if (message.channel.type ==="dm") return;

let coinAmt = Math.floor(Math.random() * 3) + 1;
let baseAmt = Math.floor(Math.random() * 3) + 1;

  let profile = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()

  let sqlstr;

  if(!profile){
    sqlstr = `INSERT INTO profile (UserID, GuildID, xp, lvl, coins, bg, note, likes, rep, w0, w1, w2, w3, w4, w5) VALUES ('${message.author.id}', '${message.guild.id}', ${generateXp()}, '1', '0', '1', 'لايوجد', '0', '0', '1', '0', '0', '0', '0', '0')`
  }
  else if(coinAmt === baseAmt){
    let coins = profile.coins
    let xp = profile.xp
    sqlstr = `UPDATE profile SET coins = ${coins + coinAmt}, xp = ${xp + generateXp()} WHERE UserID = '${message.author.id}'`;
    sql.prepare(sqlstr).run();
  }
  else{
    let xp = profile.xp
    sqlstr = `UPDATE profile SET xp = ${xp + generateXp()} WHERE UserID = '${message.author.id}'`;
    sql.prepare(sqlstr).run();
    let curlvl = profile.lvl;
    let nxtLvl = profile.lvl * 1000;
    if(nxtLvl <= profile.xp){
      sqlstr = `UPDATE profile SET lvl = ${curlvl + 1} WHERE UserID = '${message.author.id}'`;
      sql.prepare(sqlstr).run();
      let lvlico = message.author.displayAvatarURL;
    let lvlup = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setThumbnail(lvlico)
    .setTitle("LEVEL UP.")
    .setColor("#6E0A51")
    .addField("Your LEVEL: ", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
  }
  sql.prepare(sqlstr).run();

let about = sql.prepare(`SELECT * FROM about WHERE UserID = '${message.author.id}'`).get()



  if(!about){
    sqlstr = `INSERT INTO about (UserID, career, age, club, model, study, future, life, words) VALUES ('${message.author.id}', '#منصبي', '#عمري', '#نادي', '#قدوتي', '#تخصصي', '#طموحي', '#حكمتي', '#خاطري')`
     sql.prepare(sqlstr).run();
  }


  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  //if (message.content.startsWith("Turki Pasha")) return message.reply({files: ["https://cdn.discordapp.com/attachments/417087715444523010/430350204168962050/image.png"]});
  //if (message.content.toString()== ".") return message.channel.send("y");
  if (!message.content.startsWith(prefix)) return;
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args, sql);


});


// اسرع

client.on('message', message => {
  
  let points = JSON.parse(fs.readFileSync("./typePTS.json", "UTF8"));
    
  if (message.content === prefix + 'اسرع') { 
    
  const type = require('./type.json'); // in this line making the bot read file questions
  const item = type[Math.floor(Math.random() * type.length)]; // array questions
  const filter = response => { // filter for the answer
      return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
  };
    
	message.channel.send({
            files: [
              {
                name: "ques.png",
                attachment: `${item.type}`
              }
              
            ]
    
          }).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
		message.channel.send(`> **مبروك الفائز هو ${collected.first().author} ، قام بكتابة الكلمة الصحيحة**`);
		console.log(`[Typing] ${collected.first().author.username} typed the word.`);
            let won = collected.first().author; // first one
            points[won.id].points++;
          
                fs.writeFile("./typePTS.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      })

          })
          .catch(collected => {
            message.channel.send(`> **انتهى الوقت ، لم يقم أحد بالاجابة - :confused:**`);
      console.log(`[Typing] Error: No one type the word.`);
          
          })
		})
	}
});


// فكك

client.on('message', message => {
  
  let points = JSON.parse(fs.readFileSync("./typePTS.json", "UTF8"));
    
  if (message.content === prefix + 'فكك') {
    
   if (!points[message.author.id]) points[message.author.id] = {
   points: 0,id: message.author.id
    };
    
  const type = require('./disabmle.json'); // في هذا السطر يقوم الكود بقراءة ملف الأسئلة
  const itom = type[Math.floor(Math.random() * type.length)]; // الأرراي المخصص للأسئلة
  const filter = response => { // في هذا السطر يقوم بصنع فلتر للأجوبة
      return itom.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
  };
    
	message.channel.send({
            files: [
              {
                name: "ques.png",
                attachment: `${itom.type}`
              }
              
            ]
    
          }).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
		message.channel.send(`> **مبروك الفائز هو ${collected.first().author} ، قام بكتابة الأجابة قبل إنتهاء الوقت**`);
		console.log(`[Typing] ${collected.first().author.username} typed the word.`);
            let won = collected.first().author; // في هذا السطر يقوم الكود بسحب الأي دي الذي قام بالأجابة اولاً
            points[won.id].points++;
          
                          fs.writeFile("./typePTS.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      })

          })
          .catch(collected => {
            message.channel.send(`> **انتهى الوقت ، لم يقم أحد بتفكيك الجملة - :confused:**`);
			console.log(`[Typing] Error: No one type the word.`);
          })
		})
	}
});


// الاعلام


client.on('message', message => {
  
  let points = JSON.parse(fs.readFileSync("./typePTS.json", "UTF8"));
    
  if (message.content === prefix + 'اعلام') {
    
   if (!points[message.author.id]) points[message.author.id] = {
   points: 0,id: message.author.id
    };
    
  const type = require('./flags.json'); // في هذا السطر يقوم الكود بقراءة ملف الأسئلة
  const itam = type[Math.floor(Math.random() * type.length)]; // الأرراي المخصص للأسئلة
  const filter = response => { // في هذا السطر يقوم بصنع فلتر للأجوبة
      return itam.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
  };
    
      let embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setDescription(`> قم بكتابة أسم العلم الآتي قبل انتهاء الوقت`)
      .setFooter("لديك 15 ثانية لكتابة اسم العلم")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setThumbnail(itam.type);

	message.channel.send(embed).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
		message.channel.send(`> **مبروك الفائز هو ${collected.first().author} ، قام بكتابة الأجابة قبل إنتهاء الوقت**`);
		console.log(`[Typing] ${collected.first().author.username} typed the word.`);
            let won = collected.first().author; // في هذا السطر يقوم الكود بسحب الأي دي الذي قام بالأجابة اولاً
            points[won.id].points++;
          
                          fs.writeFile("./typePTS.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      })

          })
          .catch(collected => {
            message.channel.send(`> **انتهى الوقت ، لم يقم أحد بتفكيك الجملة - :confused:**`);
			console.log(`[Typing] Error: No one type the word.`);
          })
		})
	}
});




// النقاط

client.on('message', message => {
  
  let points = JSON.parse(fs.readFileSync("./typePTS.json", "UTF8"));
      
  if (message.content.startsWith(prefix + "points")) {

   if (!points[message.author.id]) points[message.author.id] = {
   points: 0,
   id: message.author.id
    };

    fs.writeFileSync("./typePTS.json", JSON.stringify(points), (err) => {
      if (err) console.error(err)
    });  
    
  let userData = points[message.author.id];

  message.channel.send(`> **${message.author.username},** Points: **${userData.points}**`);
  }
  
});


// top

client.on('message', message => {
  
      if(message.author.bot) return;
  
     if (message.content.startsWith(prefix + 'top')) {
          
     let points = JSON.parse(fs.readFileSync("./typePTS.json", "UTF8"))
     
     // points
     let _top = 1;
     let topp = Object.values(points);
     let top = topp.slice(0, 10).sort((a, b) => b.points - a.points).map(users => `\`${_top++}#\` <@${users.id}> Points: **${users.points}**`).join('\n');
    const prefixlor = new Discord.RichEmbed()
      .setAuthor("📋 Guild Points Leaderboard", client.user.avatarURL)
      .addField("Top Points:", top, true)
      .setColor(0x00AE86)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTimestamp();
   
  	message.channel.sendEmbed(prefixlor)
}
  
});
// invite code

client.on("message", message => {
  
  if(!message.content.startsWith(prefix + "invite")) return;
    message.channel.send(`> :robot: <@${client.user.id}> | **Invite**:
https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=3669056&scope=bot`)
  
});

// restart

client.on("message", async message => {
  
    if (message.author.bot) return;
  
    let owner = ["626086040599396391"]
    let args = message.content.split(" ");

    if (args[0].toLowerCase() == prefix + `restart`) {
    
    if (!owner.includes(message.author.id)) return message.channel.send("> ownership only!");
    
     message.channel.send(`<@${client.user.id}> **restarting** now!`)
    
     client.destroy().then(() => {
     client.login(process.env.BOT_TOKEN)}

                 )}
});


// منشن بوت



// clear code

client.on('message', message => {
  
    if (message.author.bot) return;
  
    if (message.content.startsWith(prefix + 'clear')) {
      
    if(!message.channel.guild) return message.channel.send(`> **This command just for servers**`);
      
     if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> **You dont't have requierd permission: \`MANAGE GUILD\` - <:eyes_rolling:698567283152388187>**`);
     if(!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`> **I don't have requierd permission \`MANAGE GUILD\` - <:eyes_rolling:698567283152388187>**`);
    let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.channel.send(`> **You can't clear more than 100 - <:eyes_rolling:698567283152388187>**`).then(messages => messages.delete(5000))
    if(!messagecount) args = '100';
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages)).then(msgs => {
      
      let embed = new Discord.RichEmbed()
      .setColor("#0099ff")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(`> \`${msgs.size} messages has been deleted!\` `)
      .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL)
      .setTimestamp();
      
    message.channel.send(embed).then(messages => messages.delete(5000));
    })
  }
});

// unban code



client.login(process.env.BOT_TOKEN);
