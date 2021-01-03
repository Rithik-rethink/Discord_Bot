const { Message, MessageEmbed } = require('discord.js');
const mysql = require('mysql');

module.exports = {
    name: 'upfav',
    description: 'Get favrouite Things of a user',
    aliases: ['updatefav', 'up'],
    guildOnly: false,
    execute(msg, args, con) {
        if(args.length === 0){
            msg.reply('Please enter your update query like : \'song\' \'updated song\' (song , singer , tv_show , food , idol , interests)');
        }
        else{
            var search_query = `SELECT Name FROM likes WHERE Name = '${msg.author.username}'`;
            con.query(search_query, async function (err, result) {
                if (err){
                    console.log(err.message);
                    msg.reply('Chutiya ho gaya mein');
                }
                else{
                    if(result.length === 0){
                        msg.reply('Your details are not present in the database');
                        
                    }
                    else{
                        for(let i = 0 ; i < args.length ; i+=2){
                            let update_query = `UPDATE likes SET ${args[i].toLowerCase()} = '${args[i+1].toLowerCase()}' WHERE Name = '${msg.author.username}'`;
                            con.query(update_query,function(err , res){
                                if(err){
                                    console.log(err.message);
                                    msg.reply('Please check the syntax to update and try again')
                                }
                                else{
                                    msg.react('👌');
                                }
                            })
                        }
                    }
                }
            });
        }
            
    }
}