const { default: Axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const mysql = require('mysql');
 
module.exports = {
    name : 'news',
    description : 'Get a users avatar',
    aliases : ['n','headlines','khabar','samachar'],
    guildOnly : false,
    async execute(msg, args, con){
        if(args.length === 0){
            return msg.channel.send('❌ You need to mention the topic for which you want the headlines');
        }
        else{
            let query = args.join(' ');
            let url = `http://newsapi.org/v2/everything?q=${query}&from=2020-12-06&sortBy=publishedAt&apiKey=6324751c3dce4cf69b447cd64e1eee43`;
            await Axios.get(url).then((res)=>{
                let arr = res.data.articles;
                for(let i = 0 ; i < 5 ; ++i ){
                    const embed = new MessageEmbed()
                                .setColor('#ff00ec')
                                .setAuthor(` ${arr[i].title}`)
                                .setTitle('Headlines ')
                                .setImage(arr[i].urlToImage)
                                .addFields(
                                    { name: 'Author 😊', value: arr[i].author},
                                    { name: 'Title 💼', value: arr[i].title, inline: true},
                                    { name: 'Description', value: arr[i].description},
                                    { name: 'Link to article', value : arr[i].url}
                                    
                                )
                    let store_query = `INSERT INTO news VALUES('${arr[i].author}' , '${arr[i].title}','${arr[i].urlToImage}' , '${arr[i].url}')`
                    con.query(store_query , function(err ,res){
                        if(err){

                            console.log('Error', err.message);
                        }
                        else{
                            msg.channel.send(embed);
                        }
                    })
                }
            })
            .catch((e)=>{
                console.log(e.message);
            })

        }
    }
}