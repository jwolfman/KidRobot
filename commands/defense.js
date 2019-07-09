/**
 * Created by joshwolfman on 7/7/19.
 */
function read(args){
    var temp=eval(args);
    if(temp===undefined){
        return 0;
    }
    return temp;
}module.exports={
    name:'defense',
    description:'Make a roll of 11 minimum.',
    aliases:['d','hp','heroPoint','deflect'],
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
            if (roll < 11) {
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