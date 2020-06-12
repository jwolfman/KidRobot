/**
 * Created by joshwolfman on 6/10/20.
 */
const file=require("../rules.json");
const actions=file["actions"];
const maneuvers=file["maneuvers"];
const ee=file["extraEffort"];
const hp=file["heroPoint"];
var table=[[],[],[],[]];
for(var c in actions){
    table[actions[c]].push(actions[c].name);
}
/*for(var cond in combined){
    if(combined[cond].tier){
        table[combined[cond].tier].push(combined[cond].name);
    }
}*/
const Discord=require('discord.js');
module.exports={
    name:'rules',
    description:'Get information on rules.',
    aliases:['rule','ru'],
    usage:'(rules)',
    execute:function(message,args) {
        const embed=new Discord.RichEmbed();
        if(args.length!=0){
            if(basic[args[0].toLowerCase()]||combined[args[0].toLowerCase()]){
                var cond=basic[args[0].toLowerCase()]||combined[args[0].toLowerCase()];
                embed.setTitle(cond.name);
                embed.setDescription(cond.data);
                return message.channel.send({embed});
            }else if(args[0]>0&&args[0]<4){
                embed.setTitle("Tier "+args[0]+" Conditions");
                embed.setDescription(table[args[0]]);
                return message.channel.send({embed});
            }
        }
        embed.setTitle("Rules");
        embed.setDescription("A full list of the conditions covered.");
        var names="";
        for(var c in actions){
            if(names==""){
                names+=actions[c].name;
            }else{
                names+=", "+actions[c].name;
            }
        }
        embed.addField("Actions",names);
        names="";
        for(var c in maneuvers){
            if(names==""){
                names+=maneuvers[c].name;
            }else{
                names+=", "+maneuvers[c].name;
            }
        }
        embed.addField("Maneuvers",names);
        return message.channel.send({embed});
    }
}