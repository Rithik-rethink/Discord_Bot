const { Message, MessageEmbed } = require('discord.js');
const mysql = require('mysql');

module.exports = {
    name: 'asklikes',
    description: 'Get favrouite Things of a user',
    aliases: ['questionlikes', 'qlikes'],
    guildOnly: false,
    execute(msg, args, con) {
        if(args.length === 0){
            msg.reply('Please enter your query : e.g \"singer\" \"arijit\"');
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
                        for(let i = 0 ; i < args.length ; i+=2){
                            let ask_query = `SELECT COUNT(*) FROM likes WHERE ${args[i]} = '${args[i+1]}'`;
                            con.query(ask_query , function(err ,res){
                                if(err){
                                    console.log(err.message);
                                    msg.reply('Something went wrong');
                                }
                                else{
                                    let ans = res[0]['COUNT(*)'];
                                    let total_query = `SELECT COUNT(*) FROM likes`;
                                    con.query(total_query , function(err , res){
                                        if(err){
                                            console.log(err.message);
                                            msg.reply('Please try again');
                                        }
                                        else{
                                            let deno = res[0]['COUNT(*)'];
                                            let percentage = ans/deno *100;
                                            msg.reply(`${percentage}% people like the ${args[i]} '${args[i+1]}'`)
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            });
        }
            
    }
}