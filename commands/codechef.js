const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name : 'chef',
    description : 'Get Problem Solving Details of a user',
    aliases : ['codechef'],
    guildOnly:false,
    async execute(msg,args){
        if(args.length === 0){
            return(msg.reply('You need to mention a userid to get their details ❌'));
        }
        for(let i = 0 ; i < args.length ; ++i ){
            await axios(`https://competitive-coding-api.herokuapp.com/api/codechef/${args[i]}`).then((res)=>{
                
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setAuthor(` ${res.data.stars} ${res.data.user_details.username}`)
                    .setTitle('User Details')
                    .addFields(
                        { name: 'Name', value: res.data.user_details.name, inline: true },
                        { name: 'Location', value: `${res.data.user_details.city}, ${res.data.user_details.state}, ${res.data.user_details.country} `, inline: true},
                        { name: 'Rating', value: res.data.rating ,inline : true},
                        { name: 'maxRating', value: res.data.highest_rating, inline: true },
                        { name: 'Global Rank', value: res.data.global_rank , inline : true},
                        { name: 'Country Rank', value: res.data.country_rank , inline: true},
                        { name: 'Fully Solved', value: res.data.fully_solved.count , inline : true},
                        { name: 'Partially Solved', value: res.data.partially_solved.count , inline: true}
                    )
                    .setFooter(res.data.user_details.institution)

                msg.channel.send(embed);
            }).catch((e)=>{
                msg.channel.send('❌ User does not exist!');
            });
        }
    }
}