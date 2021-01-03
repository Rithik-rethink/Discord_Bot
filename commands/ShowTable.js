const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');
const mysql = require('mysql');

module.exports = {
    name : 'show',
    description : 'Get interests of a user',
    aliases : ['s' , 'see' , 'display' , 'get'],
    guildOnly:false,
    async execute(msg,args,con){
        if(args.length === 0){
            return(msg.reply('You need to mention a userid to get their details ❌'));
        }
        else{
            msg.mentions.users.map((usr)=>{
                let show_query = `SELECT * FROM likes WHERE Name = '${usr.username}'`;
                con.query(show_query , function(err, res){
                    if(err){
                        msg.reply(`Some Error Occured`);
                    }
                    else{
                        if(res.length === 0){
                            msg.reply(`We coudn't collect ${usr.username}'s details.😕`)
                        }
                        else{
                            const embed = new MessageEmbed()
                                .setColor('#ff0000')
                                .setAuthor(` ${usr.username}`)
                                .setTitle('Favourites')
                                .setThumbnail(usr.displayAvatarURL({ format : "png" , dynamic: true}))
                                .addFields(
                                    { name: 'Name 😊', value: res[0].Name},
                                    { name: 'Song 🎵', value: `${res[0].song}`, inline: true},
                                    { name: 'Singer 🎤', value: res[0].singer ,inline : true},
                                    { name: 'TV Show 📺', value: res[0].tv_show, inline: true },
                                    { name: 'Idol 👱', value: res[0].idol, inline : true},
                                    { name: 'Food 🍲', value: res[0].food , inline: true},
                                    { name: 'Interests 💖', value: res[0].interests , inline : true},
                                )
                                
            
                            msg.channel.send(embed);

                        }
                    }
                })
            })
            
        }
        
    }
}