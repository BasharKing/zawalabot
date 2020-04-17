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
  http.get(`http://{process.env.PROJECT_DOMAIN}.glitch.me`);
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

const profile = JSON.parse(fs.readFileSync("profile.json", "utf8"));
 
 
 client.on('message', message => {
          if(!profile[message.author.id]) profile[message.author.id] ={
              points: 0,
              level: 1,
              rep: 0,
              tite: "No Title"
          };
          if(message.author.bot) return;
          profile[message.author.id].points = Math.floor(profile[message.author.id].points+1);
          if(profile[message.author.id].points > 250) {
              profile[message.author.id].points = 0
              profile[message.author.id].level = Math.floor(profile[message.author.id].level+1);
              message.channel.send(`**${message.author.username}, You leveld up to __${profile[message.author.id].level}__**`)
          }
          fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
      })
 
    client.on('message', message => {
        let tit = message.content.split(" ").slice(1).join(" ");
        if(message.content.startsWith(prefix + "title")) {
        if(!profile[message.author.id].tite) profile[message.author.id].tite = "Hey im using Super"
        if(!tit) {
            message.channel.send("**Usage: <title <something>**");
        } else {
            profile[message.author.id].tite = tit
            message.channel.send(`:ok:`)
        }
        }
        fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
    })
 
client.on('message', message => {
 
    if(message.content.startsWith(prefix + 'rep')) {
      if(!message.channel.guild) return;
                    moment.locale('en');
                  var getvalueof = message.mentions.users.first()
                    if(!getvalueof) return message.channel.send(`**:mag: |  ${message.author.username}, the user could not be found.    **`);
                       if(getvalueof.id == message.author.id) return message.channel.send(`**${message.author.username}, you cant give yourself a reputation !**`)
    if(profile[message.author.id].reps != moment().format('L')) {
            profile[message.author.id].reps = moment().format('L');
            profile[getvalueof.id].rep = Math.floor(profile[getvalueof.id].rep+1);
         message.channel.send(`** :up:  |  ${message.author.username} has given ${getvalueof} a reputation point!**`)
        } else {
         message.channel.send(`**:stopwatch: |  ${message.author.username}, you can raward more reputation  ${moment().endOf('day').fromNow()} **`)
        }
       }
       fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
});
 
    client.on("message", message => {
  if (message.author.bot) return;
    if(!message.channel.guild) return;
if (message.content.startsWith(prefix + "profile")) {
                               let user = message.mentions.users.first();
         var men = message.mentions.users.first();
            var heg;
            if(men) {
                heg = men
            } else {
                heg = message.author
            }
          var mentionned = message.mentions.members.first();
             var h;
            if(mentionned) {
                h = mentionned
            } else {
                h = message.member
            }
            var ment = message.mentions.users.first();
            var getvalueof;
            if(ment) {
              getvalueof = ment;
            } else {
              getvalueof = message.author;
            }
   var mentionned = message.mentions.users.first();
  let mention = message.mentions.users.first() || message.author;
 
    var client;
      if(mentionned){
          var client = mentionned;
      } else {
          var client = message.author;
 
      }
if (!profile[getvalueof.id]) profile[getvalueof.id] = {points: 0,reps: "No Reps", credits: 1, level: 1,tite: "Earth Bot User", rep: 0, lastDaily: "NOT COLLECTED"};
            let Image = Canvas.Image,
            canvas = new Canvas.createCanvas(300, 300),
            ctx = canvas.getContext('2d');
            fs.readFile("Pic.jpg", function (err, Background) { //امتداد الصورة
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 300, 300); // حجم الصورة
 
})
 
 
 
 
                let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                        ctx.fontSize = '40px'; // عرض الخط
                        ctx.fillStyle = "#000000"; // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${getvalueof.username}`, 153, 104) // احداثيات اسمك
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                        ctx.fontSize = '40px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1"; // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${getvalueof.username}`, 151, 102) // احداثيات اسمك
 
                        //credit
                        ctx.font = "bold 10px kathen" // نوع الخط وحجمه
                        ctx.fontSize = '10px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`$${credits[mention.id].credits}`, 230, 182) // احداثيات المصاري
 
 
                        ctx.font = "bold 14px kathen" // نوع الخط وحجمه
                        ctx.fontSize = '12px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[mention.id].tite}`, 150, 130) // احداثيات المصاري
 
                        //Level
                        ctx.font = "bold 24px kathen" // نوع الخط و حجمه
                        ctx.fontSize = '10px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].level}`, 70, 78) // احداثيات اللفل
 
                         //info
                        ctx.font = "bold 12px kathen" // ن
                        ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                        ctx.fillStyle = "#000000" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232) // احداثيات النقاط
 
                        //info
                        ctx.font = "bold 12px kathen" // ن
                        ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232) // احداثيات النقاط
 
                        // REP
                        ctx.font = "bold 20px  kathen";
                        ctx.fontSize = "50px";
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(`+${profile[mention.id].rep}`, 225, 76)
 
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
 
ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(75, 100, 780, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 110, 29, 82, 60);
 
message.channel.startTyping()
message.channel.sendFile(canvas.toBuffer())
message.channel.stopTyping()
})
})
}
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
