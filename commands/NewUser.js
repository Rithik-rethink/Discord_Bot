const { MessageEmbed } = require("discord.js");
const mysql = require('mysql');
const axios = require('axios');
 
module.exports = {
    name : 'add',
    description : 'Add user details to Database',
    aliases : ['new','user'],
    guildOnly : false,
    execute(msg, args,con){
        if(args.length != 3){
            msg.reply('Please provide your Codeforces_id, Codechef_id, geeksforgeeks_id only');
            
        }
        else{
            var search_query = `SELECT UserHandle FROM cp WHERE UserHandle = '${msg.author.id}'`;
            con.query(search_query, async function (err, result) {
                if (err) throw err;
                else{
                    if(result.length === 0){
                        await axios(`https://codeforces.com/api/user.info?handles=${args[0]}`).then((res)=>{
                            console.log(res.data.result);
                            var add_query = `INSERT INTO cp (UserHandle, Codeforces_id , Codechef_id , GeeksforGeeks_id) VALUES ('${msg.author.id}' , '${args[0]}' , '${args[1]}' , '${args[2]}');`
                            con.query(add_query, function (err, result) {
                                if (err) throw err;
                                else{
                                    console.log('Added User');
                                    msg.react('🆗');
                                    var codeforces_query = `INSERT INTO codeforces VALUES ('${res.data.result[0].handle}' , '${res.data.result[0].rank}' , '${res.data.result[0].rating}','${res.data.result[0].email}','${res.data.result[0].maxRank}','${res.data.result[0].maxRating}','${res.data.result[0].titlePhoto}' , '${msg.author.id}');`;
                                    con.query(codeforces_query, function (err, result) {
                                        if (err) throw err;
                                        else{
                                            console.log('Added User Details');
                                            msg.react('✅');
                                        }
                                    });
                                }
                            });
                        }).catch((e)=>{
                            msg.channel.send('❌ Codeforces user does not exist!');
                        });
                        
                    }
                    else{
                        msg.reply('User already exists');
                    }
                }
            });
        }

    }
}