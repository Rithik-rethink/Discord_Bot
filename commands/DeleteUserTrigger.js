const { MessageEmbed } = require("discord.js");
const mysql = require('mysql');

//table 3 = user organisation where they work
//table 4 = user hobbies and likes

module.exports = {
    name : 'del',
    description : 'delete user',
    aliases : ['rem','remove'],
    guildOnly : false,
    execute(msg, args , con){ 
        var search_query = `SELECT UserHandle FROM cp WHERE UserHandle = '${msg.author.id}'`;
        con.query(search_query, async function (err, result) {
            if (err) throw err;
            else{
                if(result.length === 0){
                    msg.reply('User Does not exist');
                    return;
                }
                else{

                    let i = Math.floor(Math.random() * 10000000000000000) + 1; 
                    let trigerr_query = `CREATE TRIGGER del${i} BEFORE DELETE ON cp FOR EACH ROW DELETE FROM codeforces WHERE UserHandle = '${msg.author.id}'`;
                    con.query(trigerr_query , function(err , res){
                        if(err){
                            console.log(err.message);
                            msg.reply('Could not execute the trigger☠');
                        }
                        else{
                            msg.react('⚙');
                        }
                        
                    })
                    let delete_query = `DELETE FROM cp WHERE UserHandle = '${msg.author.id}'`;
                    con.query(delete_query, function(err , res){
                        if(err){
                            console.log(err.message);
                            msg.reply('ID does not exist');
                        }
                        else{
                            msg.react('👋');
                        }
                    })
                }
            }
        })
    }
}
