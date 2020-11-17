const { MessageEmbed } = require("discord.js")

module.exports = {
    name : 'help',
    description : 'Get List of commands',
    aliases : ['h'],
    guildOnly : false,
    execute(msg, args){
        const embed  = new MessageEmbed()
            .setColor('#FFC0CB')
            .addFields(
                { name: '$avatar <mention user>', value: 'Get a users avatar 👨👩'},
                { name: '$8ball <question>', value: 'Ask random questions to the 8 ball! 🔴'},
                { name: '$chef <mention username>', value:'Get Details of a user on Codechef 💻'},
                { name: '$forces <mention username>', value:'Get Details of a user on codeforces 💻'},
                { name: '$contests <number of contests>', value:'Get a list of upcoming contests on Codeforces 📅'}
            )
        
        msg.reply(embed);
    }
}