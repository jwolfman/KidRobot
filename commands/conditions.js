/**
 * Created by joshwolfman on 7/27/19.
 */
const file=require("../conditions.json");
const basic=file["basicConditions"];
const combined=file["combinedConditions"];
var table=[[],[],[],[]];
for(var cond in basic){
    if(basic[cond].tier){
        table[basic[cond].tier].push(basic[cond].name);
    }
}
for(var cond in combined){
    if(combined[cond].tier){
        table[combined[cond].tier].push(combined[cond].name);
    }
}
const Discord=require('discord.js');
module.exports={
    name:'conditions',
    description:'Get information on conditions.',
    aliases:['cond','condition','co'],
    usage:'(condition)',
    execute:function(message,args) {
        const embed=new Discord.MessageEmbed();
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
        embed.setTitle("Conditions");
        embed.setDescription("A full list of the conditions");
        var names="";
        for(var cond in basic){
            if(names==""){
                names+=basic[cond].name;
            }else{
                names+=", "+basic[cond].name;
            }
        }
        embed.addField("Basic Conditions",names);
        names="";
        for(var cond in combined){
            if(names==""){
                names+=combined[cond].name;
            }else{
                names+=", "+combined[cond].name;
            }
        }
        embed.addField("Combined Conditions",names);
        return message.channel.send({embed});
    }
}