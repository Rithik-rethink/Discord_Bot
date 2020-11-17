const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name : 'forces',
    description : 'Get Problem Solving Details of a user',
    aliases : ['ps','cp'],
    guildOnly:false,
    async execute(msg,args){
        if(args.length === 0){
            return(msg.reply('You need to mention a userid to get their details ❌'));
        }
        
        for(let i = 0 ; i < args.length ; ++i ){
            await axios(`https://codeforces.com/api/user.info?handles=${args[i]}`).then((res)=>{
                // console.log(res.data.result[0]);
                const embed = new MessageEmbed()
                    .setColor('#00ff00')
                    .setThumbnail('http:'+res.data.result[0].titlePhoto)
                    .setAuthor(res.data.result[0].handle)
                    .setTitle('User Details')
                    .addFields(
                        { name: 'Name', value: res.data.result[0].firstName + " " + res.data.result[0].lastName, inline: true },
                        { name: 'Friends', value: res.data.result[0].friendOfCount , inline: true},
                        { name: 'Rating', value: res.data.result[0].rating ,inline : true},
                        { name: 'maxRating', value: res.data.result[0].maxRating, inline: true },
                    )
                    .setFooter(res.data.result[0].organization)

                msg.channel.send(embed);
            }).catch((e)=>{
                msg.channel.send('❌ User does not exist!');
            });
        }
    }
}