const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name : 'contests',
    description : 'Get Contest details of a user',
    aliases : ['test','upcoming'],
    guildOnly:false,
    async execute(msg,args){
        if(args.length === 0){
            return(msg.reply('Please enter the number of available contests ❌'));
        }
        await axios('https://codeforces.com/api/contest.list?gym=false').then((res)=>{
            // console.log(res.data.result);
            var date = new Date();
            date = date.toLocaleString();
            var result = [];
            var j = 0;
            while(1){
                if(res.data.result[j].phase === 'FINISHED' ){
                    break;
                }
                result.push(res.data.result[j]);
                j++;
            }
            result.sort((a,b) => (a.startTimeSeconds > b.startTimeSeconds) ? 1 : ((b.startTimeSeconds > a.startTimeSeconds) ? -1 : 0));
            var end = Math.min(args[0],result.length);
            if(end != args[0]){
                msg.reply(`Sorry ${args[0]} contests are not available`);
            }
            msg.channel.send(`Upcoming ${end} codeforces contests are..⏲`);
            for(let i = 0 ; i < end ; ++i ){
                let time = result[i].durationSeconds/60;
                time /= 60;
                let unix = result[i].startTimeSeconds * 1000;
                const DateObj = new Date(unix);
                const HumanDateFormat = DateObj.toLocaleString();
                const embed = new MessageEmbed()
                    .setColor('#0000ff')
                    .setAuthor(result[i].name)
                    .setTitle(result[i].type)
                    .addFields(
                        { name: 'Starts', value : HumanDateFormat},
                        { name: 'Duration', value: `${time} hrs`},
                        { name: 'Time passed after start of contest', value: result[i].relativeTimeSeconds < 0?0:`${result[i].relativeTimeSeconds / 3600} hrs`},
                    )
                    .setFooter(result[i].phase)

                msg.channel.send(embed)
            }
            }).catch((e)=>{
                msg.channel.send('❌ Something Went Wrong');
            });
        
    }
}