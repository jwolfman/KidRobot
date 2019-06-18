/**
 * Created by joshwolfman on 6/14/19.
 */
const Discord=require('discord.js');
const auth = require('./auth.json');
const config=require('./config.json');
const fs=require('fs');
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
bot.commands=new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (var file of commandFiles) {
	const command = require('./commands/'+file);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}
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
        if (!bot.commands.has(cmd)) return;

        try {
            bot.commands.get(cmd).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }    }
});
bot.login(auth.token);