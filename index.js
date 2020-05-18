const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
require("dotenv").config();

const config = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
};

client.on("ready", () => {
  console.log(
    `${client.user.username} has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  );
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "ping" || command === "pig") {
    const m = await message.channel.send("Ping?");
    m.edit(
      `Pong! Latency is ${
        m.createdTimestamp - message.createdTimestamp
      }ms. API Latency is ${Math.round(client.ws.ping)}ms`
    );
  }

  if (command === "thighs") {
    // message.channel.send({ files: [ { attachment: await fetch('https://nekobot.xyz/api/v2/image/thighs').then(response => response.json()).then(response => response.message) } ] });
    fetch("https://nekobot.xyz/api/v2/image/thighs")
      .then((response) => response.json())
      .then((response) => message.channel.send(response.message));
  }

  if (command === "ahegao") {
    fetch(
      "https://ahegao.egecelikci.com/api"
    )
      .then((response) => response.json())
      .then((response) =>
        message.channel.send({
          embed: {
            image: {
              url:
                response.msg
            },
          },
        })
      );
  }
  if (command === "boobs") {
    fetch(
      `http://media.oboobs.ru/boobs_preview/${getRandomIntInclusive(
        14834,
        1
      )}.jpg`
    ).then((response) => message.channel.send(response.url));

    function getRandomIntInclusive(min, max) {
      var num = Math.floor(Math.random() * (max - min + 0)) + min;
      var str = "" + num;
      var pad = "00000";
      return pad.substring(0, pad.length - str.length) + str;
    }
  }
  if (command === "eval") {
    const clean = (text) => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };
    if (message.author.id !== process.env.OWNER) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  if (command === "avatar") {
    if (!message.mentions.users.first()) {
      user = message.author;
      avatar = user.displayAvatarURL();
    } else {
      user = message.mentions.members.first();
      avatar = client.users.cache.get(user.id).displayAvatarURL();
    }
    message.channel.send({
      embed: {
        image: {
          url: avatar,
        },
      },
    });
  }
  if(command == "flipcoin")
  {
        function doRandHT() {
  var rand = ['HEADS!','TAILS!'];
  
  return rand[Math.floor(Math.random()*rand.length)];
  }
  
   const embed = {
  "title": `Here is the winner!`,
  "description": doRandHT(),
  "color": 323232,
  };
  message.channel.send({ embed });
  };
  if(command == "rps")
  {
        function doRandHT() {
  var rand = ['PAPER!','ROCK!','SCISSORS!'];
  
  return rand[Math.floor(Math.random()*rand.length)];
  }
  
   const embed = {
  "title": `ROCK! PAPER! SCISSORS!`,
  "description": doRandHT(),
  "color": 313131,
  };
  message.channel.send({ embed });
  };
});

client.login(config.token);
