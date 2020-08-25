/**
 * Created by joshwolfman on 8/24/20.
 */
var join=[
    ", welcome to the team!",
    ", ooh! A new issue!",
    ", serve well.",
    ", your duties begin.",
    ", the world rests easy under your watch.",
    ", you've been picked up for a continuing series."
];
var leave=[
    "is gone, but not forgotten.",
    ", you'll be missed.",
    ", rest well. Your watch is ended.",
    ", your ongoing title has been canceled."
];
module.exports={
    name:'roles',
    description:'Assign a role to yourself aside from On Patrol.',
    aliases:['role'],
    usage:'(role)',
    execute:function(message,args){
        var role="";
        var user=message.guild.member(message.author);
        /*console.log(message.guild.member(message.author)._roles);
        console.log(message.guild.roles.find('name',"Icon").id);
        console.log(message.guild.member(message.author)._roles.indexOf(message.guild.roles.find('name',"Icon").id));
        message.guild.roles.forEach(function(value,key){
            if(args[0]!=undefined&&value.name.toLowerCase()==args[0].toLowerCase()){
                role=key;
            }
        });
        if(role==""){
            return message.channel.send("That role does not exist.");
        }
        /*message.author.roles.forEach(function(value,key){
            console.log(value);
        });*/
        var response=message.author;
        if(args.length==0){
            return message.channel.send(message.author+", you need to specify a role.");
        }
        switch(args[0].toLowerCase()){
            case "vanguard":
                role=message.guild.roles.find('name',"Vanguard").id;
                if(user._roles.indexOf(role)==-1) {
                    user.addRole(role);
                    return message.channel.send(message.author+join[Math.floor(Math.random()*join.length)]);
                }else{
                    user.removeRole(role);
                    return message.channel.send(message.author+leave[Math.floor(Math.random()*leave.length)]);
                }
                break;
            case "sentinels":
            case "sentinel":
                role=message.guild.roles.find('name',"Sentinel").id;
                if(user._roles.indexOf(role)==-1) {
                    user.addRole(role);
                    return message.channel.send(message.author+join[Math.floor(Math.random()*join.length)]);
                }else{
                    user.removeRole(role);
                    return message.channel.send(message.author+leave[Math.floor(Math.random()*leave.length)]);
                }
                break;
            case "he":
            case "him":
            case "he/him":
                role=message.guild.roles.find('name',"He/Him").id;
                if(user._roles.indexOf(role)==-1) {
                    user.addRole(role);
                    return message.channel.send(message.author+", it's a boy!");
                }else{
                    user.removeRole(role);
                    return message.channel.send(message.author+", role removed");
                }
                break;
            case "she":
            case "her":
            case "she/her":
                role=message.guild.roles.find('name',"She/Her").id;
                if(user._roles.indexOf(role)==-1) {
                    user.addRole(role);
                    return message.channel.send(message.author+", it's a girl!");
                }else{
                    user.removeRole(role);
                    return message.channel.send(message.author+", role removed");
                }
                break;
            case "they":
            case "them":
            case "they/them":
                role=message.guild.roles.find('name',"They/Them").id;
                if(user._roles.indexOf(role)==-1) {
                    user.addRole(role);
                    return message.channel.send(message.author+", it's a person!");
                }else{
                    user.removeRole(role);
                    return message.channel.send(message.author+", role removed");
                }
                break;
            case "other":
                role=message.guild.roles.find('name',"Other").id;
                if(user._roles.indexOf(role)==-1) {
                    user.addRole(role);
                    return message.channel.send(message.author+", it's a person!");
                }else{
                    user.removeRole(role);
                    return message.channel.send(message.author+", role removed");
                }
                break;
            default: return message.channel.send(message.author+", that role cannot be manually assigned or does not exist.");
        }
        return message.channel.send(message.author+", oops! Something went really wrong.");
    }
}