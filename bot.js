/**
 * Created by joshwolfman on 6/14/19.
 */
const port=process.env.POR||8080;
const Discord=require('discord.js');
//const auth = require('./auth.json');
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
    token: process.env.token,
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
const cooldowns = new Discord.Collection();
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function(message){
//function (user, userID, channelID, message, evt){
    if (message.content.startsWith(prefix)&&!message.author.bot){
        var args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift();
        const command = bot.commands.get(commandName)
            || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(!command) return;
        if (command.args && !args.length) {
            let reply = 'You didn\'t provide any arguments, ${message.author}!';

            if (command.usage) {
                reply += '\nThe proper usage would be: \'${prefix}${command.name} ${command.usage}\'';
            }

            return message.channel.send(reply);
        }
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply('please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \'${command.name}\' command.');
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }    }
});
bot.login(process.env.token);