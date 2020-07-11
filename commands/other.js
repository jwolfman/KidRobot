/**
 * Created by joshwolfman on 7/27/19.
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
function splitDice(args){
    var temp=args.split("+");
    var ret=[];
    for(var input of temp){
        var data;
        if(input.indexOf("d")>-1){
            data=input.split("d");
        }else if(input.indexOf("D">-1)){
            data=input.split("D");
        }else{
            return -1;
        }
        data[0]=read(data[0]);
        if(data[0]==0){
            data[0]++;
        }
        data[1]=read(data[1]);
        for(var c=0;c<data[0];c++){
            ret.push(data[1]);
        }
    }
    return ret;
}
module.exports={
    name:'otherdie',
    description:'Make a roll of a non-d20.',
    aliases:['o','die','other'],
    usage:'(type) (bonus) (attempts)',
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
            if(args[c].indexOf("%")>-1){
                mesStart=true;
                mes=args[c].substring(1);
            }
        }
        var response=message.author;
        var loops=1;
        var hp=false;
        loops=read(args[2]);
        if(loops==0){
            loops++;
        }
        var dice=splitDice(args[0]);
        if(dice==-1){
            return message.channel.send("Die type argument must only be made up of numbers and 'd' or 'D',"+message.author+"!");
        }
        for(var c=0;c<loops;c++) {
            response += "\n";
            if(mes.length>0){
                response+=mes+"=";
            }
            var rolls=0;
            response += "Rolled ";
            for(var i=0;i<dice.length;i++){
                var roll= Math.floor(Math.random() * dice[i] + 1);
                rolls+=roll;
                response+=roll+" on a d"+dice[i]+" ";
                if(i<dice.length-1){
                    response+=" and ";
                }
            }
            var bonus = read(args[1]);
            response += " with a bonus of " + bonus;
            if (bonus == NaN) {
                return message.channel.send("First (bonus) argument must be an integer," + message.author + "!");
            }
            response += " for a total of " + (rolls + bonus) + "!";
        }
        return message.channel.send(response);
    }
}