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
    name:'attitude',
    description:'Make a persuasion roll to improve a target\'s attitude towards you.',
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
            response += " against a DC of 15 for ";
            var deg;
            if (crit) {
                deg = Math.floor((roll + bonus + 5 - 15) / 5);
            } else {
                deg = Math.floor((roll + bonus - 15) / 5);
            }
            if (deg >= 0) {
                var change = Math.floor(deg / 2) + 1;
                response += (deg + 1) + " degrees of success! That's " + change + " steps!";
            } else {
                response += -1 * deg + " degrees of failure!";
                if (deg <= 2) {
                    response += " That worsens their attitude by a step!";
                }
            }
        }
        return message.channel.send(response);
    }
}