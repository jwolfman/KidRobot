/**
 * Created by joshwolfman on 6/10/20.
 */
const file=require("../rules.json");
const actions=file["actions"];
const maneuvers=file["maneuvers"];
const ee=file["extraEffort"];
const hp=file["heroPoint"];
const crit=file["criticalHit"];

const Discord=require('discord.js');
module.exports={
    name:'rules',
    description:'Get information on rules.',
    aliases:['rule','ru'],
    usage:'(rules)',
    execute:function(message,args) {
        const embed=new Discord.MessageEmbed();
        if(args.length!=0){
            switch(args[0].toLowerCase()){
                case "a":
                case "act":
                case "acts":
                case "action":
                case "actions":
                    if(args.length>1){
                        input="";
                        for(var c in args){
                            if(c>0){
                                input+=args[c].toLowerCase();
                            }
                        }
                        embed.setTitle(actions[input].name);
                        embed.setDescription(actions[input].quick);
                        embed.addField("To Hit Change",actions[input].attack);
                        embed.addField("Defense Change",actions[input].defense);
                        embed.addField("Action Type",actions[input].type);
                        embed.addField("Details",actions[input].full);
                        return message.channel.send({embed});
                    }
                    embed.setTitle("Actions");
                    embed.setDescription("Here\'s a list of all actions:\nYou can send \'$rules actions [command name]\' to get info on a specific action!");
                    for(var c in actions){
                        embed.addField(actions[c].name,actions[c].quick);
                    }
                    return message.channel.send({embed});
                case "m":
                case "man":
                case "maneuver":
                case "maneuvers":
                    if(args.length>1){
                        input="";
                        for(var c in args){
                            if(c>0&&args[c].toLowerCase()!="attack"){
                                input+=args[c].toLowerCase();
                            }
                        }
                        embed.setTitle(maneuvers[input].name);
                        embed.setDescription(maneuvers[input].quick);
                        embed.addField("To Hit Change",maneuvers[input].attack);
                        embed.addField("Defense Change",maneuvers[input].defense);
                        embed.addField("Details",maneuvers[input].full);
                        return message.channel.send({embed});
                    }
                    embed.setTitle("Maneuvers");
                    embed.setDescription("Here\'s a list of all maneuvers:\nYou can send \'$rules maneuvers [command name]\' to get info on a specific maneuver!");
                    for(var c in maneuvers){
                        embed.addField(maneuvers[c].name,maneuvers[c].quick);
                    }
                    return message.channel.send({embed});
                case "e":
                case "ee":
                case "extra":
                case "extraeffort":
                    if((args.length>1&&args[1].toLowerCase()!="effort")||args.length>2){
                        input="";
                        for(var c in args){
                            if(c>0&&args[c].toLowerCase()!="effort"){
                                input+=args[c].toLowerCase();
                            }
                        }
                        if(input=="team"||input=="teampower"){
                            input="teampowerstunt";
                        }
                        embed.setTitle(ee[input].name);
                        embed.setDescription(ee[input].quick);
                        embed.addField("Details",ee[input].full);
                        return message.channel.send({embed});
                    }
                    embed.setTitle("Extra Effort");
                    embed.setDescription("Here\'s a list of all extra effort options:\nYou can send \'$rules ee [command name]\' to get info on a specific option!");
                    for(var c in ee){
                        embed.addField(ee[c].name,ee[c].quick);
                    }
                    return message.channel.send({embed});
                case "h":
                case "hp":
                case "hero":
                case "heropoint":
                    if((args.length>1&&args[1].toLowerCase()!="point")||args.length>2){
                        input="";
                        for(var c in args){
                            if(c>0&&args[c].toLowerCase()!="point"){
                                input+=args[c].toLowerCase();
                            }
                        }
                        embed.setTitle(hp[input].name);
                        embed.setDescription(hp[input].quick);
                        embed.addField("Details",hp[input].full);
                        return message.channel.send({embed});
                    }
                    embed.setTitle("Hero Point");
                    embed.setDescription("Here\'s a list of all hero point options:\nYou can send \'$rules hp [command name]\' to get info on a specific option!");
                    for(var c in hp){
                        embed.addField(hp[c].name,hp[c].quick);
                    }
                    return message.channel.send({embed});
                case "crit":
                case "critical":
                case "criticalhit":
                    if((args.length>1&&args[1].toLowerCase()!="hit")||args.length>2){
                        input="";
                        for(var c in args){
                            if(c>0&&args[c].toLowerCase()!="hit"){
                                input+=args[c].toLowerCase();
                            }
                        }
                        if(!input.includes("effect")){
                            input+="effect";
                        }
                        embed.setTitle(crit[input].name);
                        embed.setDescription(crit[input].quick);
                        embed.addField("Details",crit[input].full);
                        return message.channel.send({embed});
                    }
                    embed.setTitle("Critical Hit");
                    embed.setDescription("Here\'s a list of all critical hit options:\nYou can send \'$rules criticalhit [command name]\' to get info on a specific option!");
                    for(var c in crit){
                        embed.addField(crit[c].name,crit[c].quick);
                    }
                    return message.channel.send({embed});
            }
        }
        embed.setTitle("Rules");
        embed.setDescription("A full list of the rules covered.");
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
        names="";
        for(var c in ee){
            if(names==""){
                names+=ee[c].name;
            }else{
                names+=", "+ee[c].name;
            }
        }
        embed.addField("Extra Effort",names);
        names="";
        for(var c in hp){
            if(names==""){
                names+=hp[c].name;
            }else{
                names+=", "+hp[c].name;
            }
        }
        embed.addField("Hero Point",names);
        names="";
        for(var c in crit){
            if(names==""){
                names+=crit[c].name;
            }else{
                names+=", "+crit[c].name;
            }
        }
        embed.addField("Critical Hits",names);
        return message.channel.send({embed});
    }
}