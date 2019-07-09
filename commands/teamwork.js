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
    name:'teamwork',
    description:'Make a roll to aid another via a teamwork check.',
    aliases:['team'],
    usage:'[bonus]',
    execute:function(message,args){
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
            response += " against a DC of 10 for ";
            var deg;
            if (roll == 20) {
                deg = Math.floor((roll + bonus + 5 - 10) / 5);
            } else {
                deg = Math.floor((roll + bonus - 10) / 5);
            }
            if (deg >= 0) {
                response += (deg + 1) + " degrees of success!";
                if (deg + 1 >= 3) {
                    response += " That's a **+5** to the leader's roll!";
                } else {
                    response += " That's a **+2** to the leader's roll!";
                }
            } else {
                response += -1 * deg + " degrees of failure!";
                if (deg <= -2) {
                    response += " That's a **-2** to the leader's roll!";
                } else {
                    response += " That does nothing!"
                }
            }
        }
        return message.channel.send(response);
    }
}