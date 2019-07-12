/**
 * Created by joshwolfman on 6/17/19.
 */
function read(args){
    var temp=eval(args);
    if(temp===undefined){
        return 0;
    }
    return temp;
}module.exports={
    name:'affliction',
    description:'Make a roll to resist an affliction.',
    aliases:['aff'],
    usage:'(bonus) (DC) (attempts/hp)',
    execute:function(message,args){
        var response=message.author;
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
            response += "Rolled " + roll;
            var crit = (roll == 20);
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
            response += " against a rank " + rank + " effect for ";
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
                response += (deg + 1) + " degrees of success! No effect!";
            } else {
                response += -1 * deg + " degrees of failure!";
            }
        }
        return message.channel.send(response);
    }
}