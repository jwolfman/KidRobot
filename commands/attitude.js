/**
 * Created by joshwolfman on 6/17/19.
 */
function read(args){
    var temp;
    try{
        temp=eval(args);
    }catch(error){
        return 0;
    }
    if(temp===undefined){
        return 0;
    }
    return temp;
}
module.exports={
    name:'attitude',
    description:'Make a persuasion roll to improve a target\'s attitude towards you.',
    aliases:['at'],
    usage:'(bonus) (attempts/hp/sa)',
    execute:function(message,args){
        var mes="";
        var mesStart=false;
        var argEnd=args.length;
        for(var c=0;c<args.length;c++){
            if(mesStart){
                if(mes.length>0) {
                    mes += " " + args[c];
                }else{
                    mes+=args[c];
                }
            }
            if(args[c].indexOf("%")>-1){
                mesStart=true;
                mes=args[c].substring(1);
                argEnd=c;
            }
        }
        var response=message.author.toString();
        var loops=1;
        var hp=false;
        var sa=false;
        for(var c=1;c<argEnd;c++) {
            if (args[c].toLowerCase() == "hp" || args[c].toLowerCase() == "hero") {
                hp = true;
            }else if (args[c].toLowerCase()=="sa"||args[c].toLowerCase()=="skill"){
                sa=true;
            } else {
                loops = read(args[c]);
            }
        }
        if(loops==0){
            loops++;
        }
        for(var c=0;c<loops;c++) {
            response += "\n";
            if(mes.length>0){
                response+=mes+"=";
            }
            var roll = Math.floor(Math.random() * 20 + 1);
            var crit = (roll == 20);
            response += "Rolled " + roll;
            if (crit) {
                response += " to crit";
            }
            if(sa&&roll<5){
                roll=5;
                response+= " boosted by Skill Adept to 5";
            }
            if (hp&&roll < 11) {
                roll += 10;
                response+=" increased by a Hero Point to "+roll;
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