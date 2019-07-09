/**
 * Created by joshwolfman on 7/2/19.
 */
module.exports={
    name:'multiattack',
    description:'Make a roll for a multiattack check against a set DC',
    aliases:['mult','multi'],
    usage:'[bonus] [rank]',
    execute:function(message,args){
        var response=message.author;
        if(args.length!=2){
            return message.channel.send("Command needs a bonus and DC as input,"+message.author+"!");
        }
        var roll=Math.floor(Math.random()*20+1);
        response+=" rolled "+roll;
        if(roll==20){
            response+=" to crit";
        }
        var bonus=eval(args[0]);
        response+=" with a bonus of "+bonus;
        if(bonus==NaN){
            return message.channel.send("First (bonus) argument must be an integer,"+message.author+"!");
        }
        var rank=eval(args[1]);
        response+=" against a defense rank of  "+rank+" for ";
        if(rank==NaN){
            return message.channel.send("Second (effect rank) argument must be an integer,"+message.author+"!");
        }
        var deg;
        if(roll==20){
            deg = Math.floor((roll + bonus+5 - 10 - rank) / 5);
        }else {
            deg = Math.floor((roll + bonus - 10 - rank) / 5);
        }
        if(deg>=0){
            response+=(deg+1)+" degrees of success!";
            if(deg+1==2){
                response+=" That's a hit and the effect gets +2!";
            }else if(deg+1>2){
                response+=" That's a hit and the effect gets +5!";
            }else{
                response+=" That's a hit!";
            }
        }else{
            response+=(-1*deg)+" degrees of failure! That misses!";
        }
        return message.channel.send(response);
    }
}