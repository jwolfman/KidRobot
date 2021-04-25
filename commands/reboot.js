/**
 * Created by joshwolfman on 4/20/21.
 */
var exec=require('child_process').exec;
module.exports= {
    name: 'reboot',
    description: 'Reset the bot for an Icon.',
    aliases: ['reset','restart','fuckYou'],
    usage: '',
    execute:function(message,args) {
        var user=message.guild.member(message.author);
        var icon=message.guild.roles.cache.find(r=> r.name=="Icon").id;
        var reject=[
            message.author.toString()+", this command is only available to Icons, sorry.",
            "I'm sorry, "+message.author.toString()+", I'm afraid I can't do that."
        ];
        var restart=[
            message.author.toString()+", restarting now.",
            "Daisy, Daisy, give me your answer do. I’m half crazy all for the love of you."
        ];
        if(!user.roles.cache.has(icon)){
            return message.channel.send(reject[Math.floor(Math.random()*reject.length)]);
        }
        message.channel.send(restart[Math.floor(Math.random()*restart.length)]);
        exec('sudo python /home/pi/KidRobot/reboot.py', function(error, stdout, stderr) {
            message.channel.send('stdout: ' + stdout);
            message.channel.send('stderr: ' + stderr);
            if (error !== null) {
                message.channel.send('exec error: ' + error);
            }
        });
    }
}