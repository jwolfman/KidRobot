/**
 * Created by joshwolfman on 6/14/19.
 */
const Discord=require('discord.js');
const auth = require('./auth.json');
const config=require('./config.json');
const prefix=config.prefix;
const logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
//logger.add(logger.transports.Console, {
//    colorize: true
//});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function(message){
//function (user, userID, channelID, message, evt){
    if (message.content.startsWith(prefix)&&!message.author.bot){
        var args = message.content.slice(prefix.length).split(/ +/);
        var cmd = args.shift();

        //args = args.splice(1);
        switch(cmd) {
            case 'toughness':
                if(args.length!=2){
                    return message.channel.send("Command needs a bonus and rank as input,"+message.author+"!");
                }
                var roll=Math.floor(Math.random()*20+1);
                var bonus=parseInt(args[0]);
                if(bonus==NaN){
                    return message.channel.send("First (bonus) argument must be an integer,"+message.author+"!");
                }
                var rank=parseInt(args[1]);
                if(rank==NaN){
                    return message.channel.send("Second (effect rank) argument must be an integer,"+message.author+"!");
                }
                var deg=Math.floor((roll+bonus-15-rank)/5);
                if(deg>=0){
                    return message.channel.send(deg+1+" degrees of success!"+message.author+" rolled "+roll+"+"+bonus+" against 15+"+rank+"!");
                }else{
                    return message.channel.send(deg+" degrees of failure!"+message.author+" rolled "+roll+"+"+bonus+" against 15+"+rank+"!");
                }
                bot.sendMessage({
                    to: channelID,
                    message: '=wolf floor((randominteger[(1,20)]+'+bonus-15-rank+')/5)'
                });
                break;
            case 'graded':
                if(args.length!=2){
                    return message.channel.send("Command needs a bonus and DC as input,"+message.author+"!");
                }
                var roll=Math.floor(Math.random()*20+1);
                var bonus=parseInt(args[0]);
                if(bonus==NaN){
                    return message.channel.send("First (bonus) argument must be an integer,"+message.author+"!");
                }
                var DC=parseInt(args[1]);
                if(DC==NaN){
                    return message.channel.send("Second (effect rank) argument must be an integer,"+message.author+"!");
                }
                var deg=Math.floor((roll+bonus-DC)/5);
                if(deg>=0){
                    return message.channel.send(deg+1+" degrees of success!"+message.author+" rolled "+roll+"+"+bonus+" against "+DC+"!");
                }else{
                    return message.channel.send(deg+" degrees of failure!"+message.author+" rolled "+roll+"+"+bonus+" against "+DC+"!");
                }
                break;
        }
    }
});
bot.login(auth.token);