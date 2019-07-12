/**
 * Created by joshwolfman on 7/2/19.
 */
function read(args){
    var temp=eval(args);
    if(temp===undefined){
        return 0;
    }
    return temp;
}module.exports={
    name:'multiattack',
    description:'Make a roll for a multiattack check against a set DC',
    aliases:['mult','multi'],
    usage:'(bonus) (rank) (attempts/hp)',
    execute:function(message,args){
        var response=message.author;
        var loops=read(args[2]);
        var loops=1;
        var hp=false;
        if(args[2]=="hp"||args[2]=="HP"||args[2]=="hero"||args[2]=="Hero"){
            hp=true;
        }else{
            loops=read(args[1]);
        }
        for(var c=0;c<loops;c++) {
            response += "\n";
            var roll = Math.floor(Math.random() * 20 + 1);
            var crit = (roll == 20);
            response += "Rolled " + roll;
            if (crit) {
                response += " to crit";
            }
            if (hp&&roll < 11) {
                roll += 10;
            }
            var bonus = read(args[0]);
            response += " with a bonus of " + bonus;
            if (bonus == NaN) {
                return message.channel.send("First (bonus) argument must be an integer," + message.author + "!");
            }
            var rank = read(args[1]);
            response += " against a defense rank of  " + rank + " for ";
            if (rank == NaN) {
                return message.channel.send("Second (effect rank) argument must be an integer," + message.author + "!");
            }
            var deg;
            if (crit) {
                deg = Math.floor((roll + bonus + 5 - 10 - rank) / 5);
            } else {
                deg = Math.floor((roll + bonus - 10 - rank) / 5);
            }
            if (deg >= 0) {
                response += (deg + 1) + " degrees of success!";
                if (deg + 1 == 2) {
                    response += " That's a hit and the effect gets +2!";
                } else if (deg + 1 > 2) {
                    response += " That's a hit and the effect gets +5!";
                } else {
                    response += " That's a hit!";
                }
            } else {
                response += (-1 * deg) + " degrees of failure! That misses!";
            }
        }
        return message.channel.send(response);
    }
}