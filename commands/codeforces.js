const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');
const mysql = require('mysql');

module.exports = {
    name : 'forces',
    description : 'Get Problem Solving Details of a user',
    aliases : ['ps','cp'],
    guildOnly:false,
    async execute(msg,args, con){
        if(args.length === 0 || args.length > 1){
            return(msg.reply('Please Enter only 1 user ❌'));
        }
            msg.mentions.users.map((x)=>{
                console.log(x.id);
                const search_query = `SELECT * FROM codeforces WHERE UserHandle = '${x.id}'`;
                con.query(search_query , function(err ,result){
                    if(err){
                        msg.reply('Chutiya hai kya?');
                        return;
                    }
                    const embed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setThumbnail('http:'+result[0].avatar)
                        .setAuthor(result[0].CodeforcesHandle)
                        .setTitle('User Details')
                        .addFields(
                            { name: 'Rating', value: result[0].rating ,inline : true},
                            { name: 'maxRating', value: result[0].maxRating, inline: true },
                            { name: 'Rank', value: result[0].rank ,inline : true},
                            { name: 'maxRank', value: result[0].maxRank, inline: true },

                        )
                    msg.channel.send(embed);
                })
            });
            
        
    }
}




