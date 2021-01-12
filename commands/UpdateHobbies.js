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
                    msg.reply('Please try again');
                }
                else{
                    if(result.length === 0){
                        msg.reply('Your details are not present in the database');
                        
                    }
                    else{
                        msg.reply('Are you sure you want to update the details? (Y/N)');
                                msg.channel.awaitMessages(m => m.author.id == msg.author.id,
                                    {max: 1, time: 30000}).then(collected => {
                                            // only accept messages by the user who sent the command
                                            // accept only 1 message, and return the promise after 30000ms = 30s
        
                                            // first (and, in this case, only) message of the collection
                                            if (collected.first().content.toLowerCase() == 'y') {
                                                msg.reply('Updating..');
                                                for(let i = 0 ; i < args.length ; i+=2){
                                                    msg.reply(`Updating ${args[i]} to ${args[i+1]}`);
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
                                            else{
                                                msg.reply('Operation canceled.');
                                             
                                            }
                                }).catch(() => {
                                        msg.reply('No answer after 30 seconds, operation canceled.');
                                 
                                }); 
                      
                        
                    }
                }
            });
        }
            
    }
}