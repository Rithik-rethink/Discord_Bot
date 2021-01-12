const { MessageEmbed } = require("discord.js");
const mysql = require('mysql');
 
module.exports = {
    name : 'org',
    description : 'Get a users avatar',
    aliases : ['work','school'],
    guildOnly : false,
    execute(msg, args, con){
        if(args.length === 0){
            return msg.channel.send('Please Enter your occupation(school, job etc) , name of organization you work in, city , state and country');
        }
        else{
            var search_query = `SELECT Name FROM organization WHERE Name = '${msg.author.username}'`;
            con.query(search_query, async function (err, result) {
                if (err) throw err;
                else{
                    if(result.length === 0){
                        let insert_query = `INSERT INTO organization VALUES ('${args[0].toLowerCase()}' , '${args[1].toLowerCase()}' , '${args[2].toLowerCase()}' , '${args[3].toLowerCase()}' , '${args[4].toLowerCase()}' ,'${msg.author.username}')`;
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