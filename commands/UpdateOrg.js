const { Message, MessageEmbed } = require('discord.js');
const mysql = require('mysql');

module.exports = {
    name: 'uporg',
    description: 'Get favrouite Things of a user',
    aliases: ['updateorg', 'uorg'],
    guildOnly: false,
    execute(msg, args, con) {
        if(args.length === 0){
            msg.reply('Please enter your update query like : \'occupations\' \'updated occupation\' (occupation , organization_name, city, state , country)');
        }
        else{
            var search_query = `SELECT Name FROM organization WHERE Name = '${msg.author.username}'`;
            con.query(search_query, async function (err, result) {
                if (err){
                    console.log(err.message);
                    msg.reply('Please try again');
                }
                else{
                    if(result.length === 0){
                        msg.reply('Your details are not present in the database');
                        
                    }
                    else{
                        for(let i = 0 ; i < args.length ; i+=2){
                            let update_query = `UPDATE organization SET ${args[i].toLowerCase()} = '${args[i+1].toLowerCase()}' WHERE Name = '${msg.author.username}'`;
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