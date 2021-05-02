/**
 * Created by joshwolfman on 7/2/19.
 */
function read(args){
    var temp;
    try{
        temp=eval(args);
    }catch(error){
        return 0;
    }
    if(temp===undefined||temp==NaN){
        return 0;
    }
    return temp;
}
module.exports={
    name:'roll',
    description:'Make a roll.',
    aliases:['r'],
    usage:'(bonus) (attempts/hp/sa/c#)',
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
        var ic=0;
        for(var c=1;c<argEnd;c++) {
            if (args[c].toLowerCase() == "hp" || args[c].toLowerCase() == "hero") {
                hp = true;
            }else if (args[c].toLowerCase()=="sa"||args[c].toLowerCase()=="skill") {
                sa = true;
            } else {
                switch (args[c].toLowerCase()) {
                    case "c1":
                    case "1c":
                        ic=1;
                        break;
                    case "c2":
                    case "2c":
                        ic=2;
                        break;
                    case "c3":
                    case "3c":
                        ic=3;
                        break;
                    case "c4":
                    case "4c":
                        ic=4;
                        break;
                    default:
                        loops = read(args[c]);
                }
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
            var crit = (roll >= 20-ic);
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
            response += " for a total of " + (roll + bonus) + "!";
            if (crit&&roll==20) {
                response += " That's an effective " + (roll + bonus + 5) + "!";
            }
            if(roll==1){
                response+=" If that's an attack it misses!";
            }
        }
        return message.channel.send(response);
    }
}