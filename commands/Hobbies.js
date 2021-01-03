const { Message, MessageEmbed } = require('discord.js');
const mysql = require('mysql');

module.exports = {
    name: 'fav',
    description: 'Get favrouite Things of a user',
    aliases: ['favrouites', 'likes'],
    guildOnly: false,
    execute(msg, args, con) {
        if(args.length === 0){
            msg.reply('Please enter your favourite song, singer, show, food , idol and interest like singing , dancing etc')
        }
        else{
            console.log(msg.author.username);
            var search_query = `SELECT Name FROM likes WHERE Name = '${msg.author.username}'`;
            con.query(search_query, async function (err, result) {
                if (err) throw err;
                else{
                    if(result.length === 0){
                        let insert_query = `INSERT INTO likes VALUES ('${msg.author.username}' , '${args[0].toLowerCase()}' , '${args[1].toLowerCase()}' , '${args[2].toLowerCase()}' , '${args[3].toLowerCase()}' , '${args[4].toLowerCase()}' , '${args[5].toLowerCase()}')`;
                        con.query(insert_query , function(err , res){
                            if(err){
                                console.log(err.message);
                                msg.reply('Some error occured, please try again');
                            }
                            else{
                                msg.react('👊');
                            }
                        })
                        
                    }
                    else{
                        msg.reply('User already exists');
                    }
                }
            });
        }
            
    }
}