const discord = require('discord.js');
const client = new discord.Client();
const env = require('dotenv').config();
const fs = require('fs');
const prefix = '.'
const mysql =require('mysql');
var con = mysql.createConnection({
    hostname: "localhost:5000",
    user: "rithik",
    password: "Rishabh1",
    database : "DBMS"
    
});
con.connect(function(err) {
    if(err){
        console.log(err.message);
    }
    else{
        console.log('Connected!');
    }
});


client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.login(process.env.TOKEN);

client.on('ready', readyDiscord);
client.on('message', readMsg);

function readyDiscord(){
    console.log('ready 😇')
}
client.once("reconnecting", () => {
    console.log("Reconnecting!");
  });
  
  client.once("disconnect", () => {
    console.log("Disconnect!");
  });

function readMsg(msg){
    
    if(!msg.content.startsWith(prefix) || msg.author.bot){
        return;
    }  
    
    const arg = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = arg.shift().toLowerCase();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command){
        return msg.reply('❌ Not a valid command');
    }
    try{
        if(command.guildOnly && msg.channel.type === 'dm'){
            return message.reply('I can\'t execute that command inside DMs!');
        }
        client.commands.get(command.name).execute(msg,arg,con);
    }
    catch(e){
        // console.error(e);
        msg.reply('❌ there was an error trying to execute that command!');
    }

}