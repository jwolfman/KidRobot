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
    name:'graded',
    description:'Make a roll for a general graded check against a set DC',
    usage:'(bonus) (DC) (attempts/hp)',
    execute:function(message,args){
        var response=message.author;
        var loops=1;
        var hp=false;
        if(args[2]=="hp"||args[2]=="HP"||args[2]=="hero"||args[2]=="Hero"){
            hp=true;
        }else{
            loops=read(args[2]);
        }
        if(loops==0){
            loops++;
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
            var DC = read(args[1]);
            response += " against a DC of  " + DC + " for ";
            if (DC == NaN) {
                return message.channel.send("Second (effect rank) argument must be an integer," + message.author + "!");
            }
            var deg;
            if (crit) {
                deg = Math.floor((roll + bonus + 5 - 15 - rank) / 5);
            } else {
                deg = Math.floor((roll + bonus - 15 - rank) / 5);
            }
            if (deg >= 0) {
                response += (deg + 1) + " degrees of success!";
            } else {
                response += -1 * deg + " degrees of failure!";
            }
        }
        return message.channel.send(response);
    }
}