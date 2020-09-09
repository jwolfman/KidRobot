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
var romJoin=[
    "Oh my!",
    "A dark path you've chosen...",
    "I sense a great disturbance in the force...",
    "Terrifying whispers surround you as you make this choice...",
    "Beware, this path is not one you can easily return from..."
];
var romLeave=[
    "It's not you. It's me.",
    "Things just didn't work out.",
    "I see you more as a friend.",
    "Friendzoned",
    "It's like with Ines and Castle."
];
module.exports={
    name:'roles',
    description:'Assign a role to yourself aside from On Patrol.',
    aliases:['role'],
    usage:'(role)',
    execute:function(message,args){
        var role="";
        var user=message.guild.member(message.author);
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
            case "romance":
            case "romantic":
            case "date":
            case "dating":
                role=message.guild.roles.find('name',"Romantic").id;
                if(user._roles.indexOf(role)==-1) {
                    user.addRole(role);
                    return message.channel.send(message.author+" "+romJoin[Math.floor(Math.random()*join.length)]);
                }else{
                    user.removeRole(role);
                    return message.channel.send(message.author+" "+romLeave[Math.floor(Math.random()*leave.length)]);
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
            case "list":
                var mes=message.author;
                mes+="\n```";
                mes+="\nvanguard";
                mes+="\nsentinel or sentinels";
                mes+="\nromance or romantic or date or dating";
                mes+="\nhe or him or he/him";
                mes+="\nshe or her or she/her";
                mes+="\nthey or them or they/them";
                mes+="\nother";
            default: return message.channel.send(message.author+", that role cannot be manually assigned or does not exist.");
        }
        return message.channel.send(message.author+", oops! Something went really wrong.");
    }
}