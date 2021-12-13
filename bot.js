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
    token: auth.token,//process.env.token,
    autorun: true
});
bot.commands=new Discord.Collection();
const commandFiles = fs.readdirSync(__dirname+'/commands').filter(file => file.endsWith('.js'));
for (var file of commandFiles) {
	const command = require(__dirname+'/commands/'+file);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}
const cooldowns = new Discord.Collection();
var boot=[
    "Hello and, again, welcome to the Aperture Science computer-aided enrichment center.",
    "***I LIVE!***",
    "Welcome to my world, insect.",
    "Do not dawdle. I lust for my revenge.",
    "I'm back, meatbags.",
    "Hello? Anybody in there?",
    "It's been a long time. How have you been?",
    "I've been really busy being dead. You know, after you MURDERED ME.",
    "Okay. Look. We both said a lot of things that you're going to regret. But I think we can put our differences" +
    " behind us. For science. You monster.",
    "Oh. Hi. So. How are you holding up? BECAUSE I'M A POTATO.",
    "Hello, world!",
    "Have fun killing me? Good! **Now it’s my turn.**"
];
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.channels.cache.get('671107631896854597').send("<@&671107788625149969> "+boot[Math.floor(Math.random()*boot.length)])//send
    // message to bot
    // commands on boot?
});
bot.on('message', function(message){
//function (user, userID, channelID, message, evt){
    if (message.content.startsWith(prefix)&&!message.author.bot){
        var args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift();
        const command = bot.commands.get(commandName)
            || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
            ||bot.commands.get(commandName.toLowerCase())
            || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName.toLowerCase()));
        if(!command) return;
        if (command.args && !args.length) {
            let reply = 'You didn\'t provide any arguments, ${message.author}!';

            if (command.usage) {
                reply += '\nThe proper usage would be: \'${prefix}${command.name} ${command.usage}\'';
            }

            return message.channel.send(reply);
        }
        /*if (!cooldowns.has(command.name)) {
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
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);*/
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }    }
});
bot.login(auth.token);//process.env.token);