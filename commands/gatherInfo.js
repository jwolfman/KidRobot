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
    name:'gatherInfo',
    description:'Make an investigation roll to find information.',
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
            var crit = (roll == 20);
            response += "Rolled " + roll;
            if (crit) {
                response += " to crit";
            }
            var bonus = read(args[0]);
            response += " with a bonus of " + bonus;
            if (bonus == NaN) {
                return message.channel.send("First (bonus) argument must be an integer," + message.author + "!");
            }
            response += " against a DC of 10 for ";
            var deg;
            if (crit) {
                deg = Math.floor((roll + bonus + 5 - 10) / 5);
            } else {
                deg = Math.floor((roll + bonus - 10) / 5);
            }
            if (deg >= 0) {
                response += (deg + 1) + " degrees of success!";
                switch (deg + 1) {
                    case 1:
                        response += " That's general info and gossip!";
                        break;
                    case 2:
                        response += " That's specific info!";
                        break;
                    case 3:
                        response += " That's restricted info!";
                        break;
                    case 4:
                        response += " That's protected info!";
                        break;
                }
            } else {
                response += -1 * deg + " degrees of failure!";
                if (deg < -1) {
                    response += " You might have been found out!";
                }
            }
        }
        return message.channel.send(response);
    }
}