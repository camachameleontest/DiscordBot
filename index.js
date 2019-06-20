const Discord = require('discord.js');
const bot = new Discord.Client();

const token = process.env.BOT_TOKEN;

const fs = require("fs");
bot.msgs = require("./msgs.json");
bot.prefix = require("./config.json");

let { prefix } = require("./config.json");
let lengthPrefix = prefix.length + 9;
let lengthPrePrefix = prefix.length + 7;

// var data = fs.readFileSync('./config.json');
// var words = JSON.parse(data);

bot.on('ready', () =>{
    console.log('This bot is online');
    console.log(lengthPrefix);
    bot.user.setActivity("Prefix: " + prefix, {type: "WATCHING"}).catch(console.error);
})

//comands

bot.on('message', msg=>{
    if(msg.content === "prefixBeWa"){
        msg.reply('Wat wil je instellen als prefix?');
    }
})

let info = ["server", "author"];
let help = ["info", "embed", "website", "react", 'writeMemo', "getMemo"];
// let helpLegend = [];
let helpMod = ["clear", "kick", "prefix", "herstart"];

let testRol = "test"

//Mod Commands

bot.on('message', message=>{
    let args = message.content.substring(prefix.length).split(" ");
    
    switch (args[0]) {
        case 'clear':
            if(!message.member.roles.find(r => r.name === testRol)) return message.reply("You do not have that permission").then(msg => msg.delete(5000));
            message.channel.bulkDelete(args[1]);
            break;
        }

        
        switch (args[0]) {
        case "kick":
        if (message.member.roles.find(r => r.name === testRol)){

            const user = message.mentions.users.first();

            if(user){
                const member = message.guild.member(user);
                if(member) {
                    member.kick("you were kicked").then(() => {
                        message.reply(`succesfully kicked ${user.tag}`);
                    }).catch(err => {
                        message.reply('I was unable to kick the member')
                        console.log(err);
                    });
                } else {
                    message.reply("that user isn\'t in this clan")
                }
            } else {
                message.reply("You need to specify a person")
            }

        } else {
            return message.channel.send('You do not have that permission')
        }
        break;

        case 'helpMod':
            if (message.member.roles.find(r => r.name === testRol)){
                message.channel.sendMessage('Dit zijn de commands:\r\n' + helpMod.join("\r\n"));
            } else {
                return message.channel.send('You do not have that permission')
            }
        break;

        case 'prefix':
            if (message.member.roles.find(r => r.name === testRol)){

                bot.prefix["prefix"] = message.content.slice(lengthPrePrefix);
                fs.writeFile ("./config.json", JSON.stringify (bot.prefix, null, 4), err => {
                    if (err) throw err;
                    message.channel.send("prefix has been changed");
                });

                // bot.prefix [prefix] = {
                //     prefix: message.content.slice(lengthPrePrefix)
                // }
                // fs.writeFile ("./config.json", JSON.stringify (bot.prefix, null, 4), err => {
                //     if (err) throw err;
                //     message.channel.send("prefix has been changed");
                // });
            } else {
                return message.channel.send('You do not have that permission')
            }
        break;
        
    }
})

//gewone commands
bot.on('message', message=>{
    let args = message.content.substring(prefix.length).split(" ");
    
    switch(args[0]){
        // case 'ping':
        //     message.reply('pong');
        //     message.channel.sendMessage('pong');
        //     break;

        case 'website':
            message.channel.sendMessage('http://camachameleon.epizy.com/?i=2');
            break;

        case 'info':
            if(args[1] === 'server'){
                message.channel.sendMessage('All info is in #info');
            } else if (args[1] === 'author') {
                message.channel.sendMessage('Made by Camachameleon');
            } else {
                message.channel.sendMessage('Kies uit:\r\n' + info.join("-\r\n"));
            }
            break;

            case 'help':
                message.channel.sendMessage('Dit zijn de commands:\r\n' + help.join("\r\n"));
                break;

            case 'react':
                message.react('🤡');
                break;
    }

    switch(args[0]){
        case 'embed':
            const embed = new Discord.RichEmbed() 
            .setColor(0xFF0000)
            .setTitle('User Information')
            .addField('Player Name', message.author.username)
            .addField("Roles: ", message.member.roles.map(role => role.name).join(", "))
            .addField('Current Server', message.guild.name)
            .addField('AvatarUrl',message.author.avatarURL)
            .setThumbnail(message.author.avatarURL)
            .setFooter('Subscribe to keemstar!')
             message.channel.sendEmbed(embed);
             break;
     }

     switch(args[0]){

        case 'writeMemo':
            bot.msgs [message.author.username] = {
                message: message.content
            }
            fs.writeFile ("./msgs.json", JSON.stringify (bot.msgs, null, 4), err => {
                if (err) throw err;
                message.channel.send("memo has been written");
            });
            break;
            
            case 'getMemo':
            let _message = bot.msgs[message.author.username].message.slice(lengthPrefix);
            message.channel.send ("memo: " + _message);
        break;
    }

});

//einde commands

bot.login(token);
