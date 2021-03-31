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
var MCJoin=[
    "And my pickaxe!",
    "Casual gaming!",
    "Do you want to join my server?",
    "Hang out with your friends online!",
    "Brothers of the mine rejoice!"
];
var MCLeave=[
    "*Hissssss*",
    "*Bones rattle*"
];
module.exports={
    name:'roles',
    description:'Assign a role to yourself aside from On Patrol.',
    aliases:['role'],
    usage:'(role)',
    execute:function(message,args){
    var role="";
    var user=message.guild.member(message.author);
    /*console.log(message.guild.roles.cache.find(r=> r.name=="Miner").id);
    console.log(message.guild.member(message.author)==message.member);*/
    var response=message.author.toString();
    if(args.length==0){
        response+=", you need to specify a role. Use the following\n";
        args[0]="list";
    }
    switch(args[0].toLowerCase()){
        case "duty":
        case "patrol":
            role=message.guild.roles.cache.find(r=> r.name=="On Patrol").id;
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+join[Math.floor(Math.random()*join.length)]);
            }else{
                user.roles.remove(role);
                return message.channel.send(message.author.toString()+leave[Math.floor(Math.random()*leave.length)]);
            }
            break;
        case "welcome":
        case "welcoming":
            role=message.guild.roles.cache.find(r=> r.name=="Welcoming Committee").id;
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+join[Math.floor(Math.random()*join.length)]);
            }else{
                user.roles.remove(role);
                return message.channel.send(message.author.toString()+leave[Math.floor(Math.random()*leave.length)]);
            }
            break;
        case "vanguard":
            role=message.guild.roles.cache.find(r=> r.name=="Vanguard").id;
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+join[Math.floor(Math.random()*join.length)]);
            }else{
                user.roles.remove(role);
                return message.channel.send(message.author.toString()+leave[Math.floor(Math.random()*leave.length)]);
            }
            break;
        case "sentinels":
        case "sentinel":
            role=message.guild.roles.cache.find(r=> r.name=="Sentinel").id;
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+join[Math.floor(Math.random()*join.length)]);
            }else{
                user.roles.remove(role);
                return message.channel.send(message.author.toString()+leave[Math.floor(Math.random()*leave.length)]);
            }
            break;
        case "romance":
        case "romantic":
        case "date":
        case "dating":
            role=message.guild.roles.cache.find(r=> r.name=="Romantic").id;
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+" "+romJoin[Math.floor(Math.random()*join.length)]);
            }else{
                user.roles.remove(role);
                return message.channel.send(message.author.toString()+" "+romLeave[Math.floor(Math.random()*leave.length)]);
            }
            break;
        case "game":
        case "arcade":
            role=message.guild.roles.cache.find(r=> r.name=="Gamer");
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+" "+MCJoin[Math.floor(Math.random()*join.length)]);
            }else{
                message.member.roles.remove(role);
                return message.channel.send(message.author.toString()+" "+MCLeave[Math.floor(Math.random()*leave.length)]);
            }
            break;
        case "he":
        case "him":
        case "he/him":
            role=message.guild.roles.cache.find(r=> r.name=="He/Him").id;
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+", it's a boy!");
            }else{
                user.roles.remove(role);
                return message.channel.send(message.author.toString()+", role removed");
            }
            break;
        case "she":
        case "her":
        case "she/her":
            role=message.guild.roles.cache.find(r=> r.name=="She/Her").id;
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+", it's a girl!");
            }else{
                user.roles.remove(role);
                return message.channel.send(message.author.toString()+", role removed");
            }
            break;
        case "they":
        case "them":
        case "they/them":
            role=message.guild.roles.cache.find(r=> r.name=="They/Them").id;
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+", it's a person!");
            }else{
                user.roles.remove(role);
                return message.channel.send(message.author.toString()+", role removed");
            }
            break;
        case "other":
            role=message.guild.roles.cache.find(r=> r.name=="Other").id;
            if(!user.roles.cache.has(role)){
                user.roles.add(role);
                return message.channel.send(message.author.toString()+", it's a person!");
            }else{
                user.roles.remove(role);
                return message.channel.send(message.author.toString()+", role removed");
            }
            break;
        case "list":
            response+="\n```";
            response+="\nduty or patrol";
            response+="\nvanguard";
            response+="\nsentinel or sentinels";
            response+="\nwelcome or welcoming";
            response+="\nromance or romantic or date or dating";
            response+="\ngame or arcade";
            response+="\nhe or him or he/him";
            response+="\nshe or her or she/her";
            response+="\nthey or them or they/them";
            response+="\nother";
            response+="\n```";
            return message.channel.send(response);
        default: return message.channel.send(message.author.toString()+", that role cannot be manually assigned or does not exist.");
    }
    return message.channel.send(message.author.toString()+", oops! Something went really wrong.");
}
}
