const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');
const mysql = require('mysql');

module.exports = {
    name : 'showorg',
    description : 'Get interests of a user',
    aliases : ['sorg' , 'seeorg' , 'displayorg' , 'getorg'],
    guildOnly:false,
    async execute(msg,args,con){
        if(args.length === 0){
            return(msg.reply('You need to mention a userid to get their details ❌'));
        }
        else{
            msg.mentions.users.map((usr)=>{
                let show_query = `SELECT * FROM organization WHERE Name = '${usr.username}'`;
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
                                .setColor('#ff00de')
                                .setAuthor(` ${usr.username}`)
                                .setTitle('Work Info 👔')
                                .setThumbnail(usr.displayAvatarURL({ format : "png" , dynamic: true}))
                                .addFields(
                                    { name: 'Name 😊', value: res[0].Name},
                                    { name: 'Occupation 💼', value: `${res[0].occupation}`, inline: true},
                                    { name: 'Workplace', value: res[0].organization_name ,inline : true},
                                    { name: 'City 🏘', value: res[0].city, inline: true },
                                    { name: 'State 🌇', value: res[0].state, inline : true},
                                    { name: 'Country 🇳', value: res[0].country , inline: true},
                                )
                                
            
                            msg.channel.send(embed);

                        }
                    }
                })
            })
            
        }
        
    }
}