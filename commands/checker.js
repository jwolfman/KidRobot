/**
 * Created by joshwolfman on 7/28/19.
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
module.exports= {
    name: 'checker',
    description: 'Check a value against another.',
    aliases: ['c','check'],
    usage: '(value) (DC)',
    execute: function (message, args) {
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
        response += "\n";
        if(mes.length>0){
            response+=mes+"=";
        }
        var value = read(args[0]);
        response += value+" compared ";
        if (value == NaN) {
            return message.channel.send("First (bonus) argument must be an integer," + message.author + "!");
        }
        var DC = read(args[1]);
        response += " against a DC of  " + DC + " for ";
        if (DC == NaN) {
            return message.channel.send("Second (effect rank) argument must be an integer," + message.author + "!");
        }
        var deg= Math.floor((value - DC) / 5);
        if (deg >= 0) {
            response += (deg + 1) + " degrees of success!";
        } else {
            response += -1 * deg + " degrees of failure!";
        }
        return message.channel.send(response);
    }
}