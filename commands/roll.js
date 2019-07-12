/**
 * Created by joshwolfman on 7/2/19.
 */
function read(args){
    var temp=eval(args);
    if(temp===undefined||temp==NaN){
        return 0;
    }
    return temp;
}module.exports={
    name:'roll',
    description:'Make a roll.',
    aliases:['r'],
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
            response += " for a total of " + (roll + bonus) + "!";
            if (crit) {
                response += " That's an effective " + (roll + bonus + 5) + "!";
            }
        }
        return message.channel.send(response);
    }
}