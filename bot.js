const discord = require('discord.js');
const client = new discord.Client();
const client_info = require('./client_info.js');
const fs = require('fs');
const prefix = '$'

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.login(client_info.TOKEN);

client.on('ready', readyDiscord);
client.on('message', readMsg);

function readyDiscord(){
    console.log('ready 😇')
}

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
        client.commands.get(command.name).execute(msg,arg);
    }
    catch(e){
        // console.error(e);
        msg.reply('❌ there was an error trying to execute that command!');
    }

}