const Discord = require("index.js")


module.exports.run = async (client, message, args) => {

    if (message.member.roles.find(r => r.name === testRol)){

        
    } else {
        return message.channel.send('You do not have that permission')
    }

    try {
        await message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`Error: ${e.message}`)
    }


}

module.exports.config = {
    name: "shutdown",
    description: "shuts down the bot!",
    usage: "!shutdown",
    accesableby: "bot adminds",
    aliases: ["botstop"]
}