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
    name:'gatherInfo',
    description:'Make an investigation roll to find information.',
    usage:'(bonus) (attempts/hp)',
    execute:function(message,args){
        var mes="";
        var mesStart=false;
        for(var c=0;c<args.length;c++){
            if(mesStart){
                if(mes.length>0) {
                    mes += " " + args[c];
                }else{
                    mes+=args[c];
                }
            }
            if(args[c].indexOf("#")>-1){
                mesStart=true;
                mes=args[c].substring(1);
            }
        }
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
            if(mes.length>0){
                response+=mes+"=";
            }
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