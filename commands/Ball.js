module.exports = {
    name : '8ball',
    description : 'Ask it anything you like',
    guildOnly : true,
    aliases : ['8 ball','8'],
    execute(msg,args){
        const replies = [
            "As I see it, yes",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don’t count on it",
            "It is certain",
            "It is decidedly so",
            "Most likely",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Outlook good",
            "Reply hazy, try again",
            "Signs point to yes",
            "Very doubtful",
            "Without a doubt",
            "Yes",
            "Yes – definitely",
            "You may rely on it"
        ];
        if(args.length === 0){
            return msg.reply('Concentrate and ask me a question, I will try to be as honest as possible. 😊');
        }
        var reply = replies[Math.floor(Math.random() * replies.length)];
        msg.reply(reply);
    }
}