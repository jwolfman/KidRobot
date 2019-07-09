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
    name:'toughness',
    description:'Make a toughness roll based on a bonus and the ranks of the damage effect',
    aliases:['tough','t'],
    usage:'[bonus] [ranks]',
    execute:function(message, args){
        var response=message.author;
        var loops=read(args[1]);
        if(loops==0){
            loops++;
        }
        for(var c=0;c<loops;c++) {
            response += "\n";
            var roll = Math.floor(Math.random() * 20 + 1);
            response += "Rolled " + roll;
            if (roll == 20) {
                response += " to crit";
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
            if (roll == 20) {
                deg = Math.floor((roll + bonus + 5 - 15 - rank) / 5);
            } else {
                deg = Math.floor((roll + bonus - 15 - rank) / 5);
            }
            if (deg >= 0) {
                response += (deg + 1) + " degrees of success! No effect!";
            } else {
                response += -1 * deg + " degrees of failure!";
                switch (deg) {
                    case -1:
                        response += " That's a **Bruise**!";
                        break;
                    case -2:
                        response += " That's a **Bruise** and **Dazed**!";
                        break;
                    case -3:
                        response += " That's a **Bruise** and **Staggered**!";
                        break;
                    case -4:
                    default:
                        response += " That's **Incapacitated**!";
                        break;
                }
            }
        }
        return message.channel.send(response);
    }
};