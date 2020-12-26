const { MessageEmbed } = require("discord.js");
const mysql = require('mysql');
 
module.exports = {
    name : 'avatar',
    description : 'Get a users avatar',
    aliases : ['dp','icon'],
    guildOnly : false,
    execute(msg, args){
        if(args.length === 0){
            return msg.channel.send('❌ You need to mention the users to get their avatars');
        }
        const av = msg.mentions.users.map((usr)=>{
            const embed = new MessageEmbed()
                .setAuthor(usr.username)
                .setImage(usr.displayAvatarURL({ format : "png" , dynamic: true}))

            return(embed);
        })
        msg.channel.send(av);
    }
}