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
    usage:'(bonus) (attempts/hp)',
    execute:function(message,args){
        var response=message.author;
        var loops=1;
        var hp=false;
        if(args[1]=="hp"||args[1]=="HP"||args[1]=="hero"||args[1]=="Hero"){
            hp=true;
        }else{
            loops=read(args[1]);
        }
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
            if (hp&&roll < 11) {
                roll += 10;
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