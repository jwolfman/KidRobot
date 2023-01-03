/**
 * Created by joshwolfman on 7/1/21.
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
    name:'weaken',
    description:'Make a roll for a weaken or other difference.',
    aliases:['w','weak','we','difference','dif','diff'],
    usage:'(bonus) (DC) (attempts/hp/sa/c#)',
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
        for(var c=2;c<argEnd;c++) {
            if (args[c].toLowerCase() == "hp" || args[c].toLowerCase() == "hero") {
                hp = true;
            }else if (args[c].toLowerCase()=="sa"||args[c].toLowerCase()=="skill") {
                sa = true;
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
            var DC = read(args[1]);
            response += " against a DC of  " + DC;
            if (DC == NaN) {
                return message.channel.send("Second (effect rank) argument must be an integer," + message.author + "!");
            }
            response += " for a total of " + (roll + bonus) + " for a difference of "+(roll+bonus-DC)+"!";
            if (crit&&roll==20) {
                response += " That's an effective " + (roll + bonus + 5) +" for a difference of "+(roll+bonus+5-DC)+ "!";
            }
            if(roll==1){
                response+=" If that's an attack it misses!";
            }
        }
        return message.channel.send(response);
    }
}