module.exports = {
    name : 'ping',
    description : 'Ping!',
    guildOnly : false,
    aliases : ['Ping'],
    execute(msg , args){
        msg.channel.send('Pong 🔴');
    },
    
}