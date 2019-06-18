/**
 * Created by joshwolfman on 6/17/19.
 */
module.exports={
    name:'teamwork',
    description:'Make a roll to aid another via a teamwork check.',
    usage:'[bonus]',
    execute:function(message,args){
        var response=message.author;
        if(args.length!=1){
            return message.channel.send("Command needs a bonus as input,"+message.author+"!");
        }
        var roll=Math.floor(Math.random()*20+1);
        response+=" rolled "+roll;
        if(roll==20){
            response+=" to crit";
        }
        var bonus=parseInt(args[0]);
        response+=" with a bonus of "+bonus;
        if(bonus==NaN){
            return message.channel.send("First (bonus) argument must be an integer,"+message.author+"!");
        }
        response+=" against a DC of 10 for ";
        var deg;
        if(roll==20){
            deg = Math.floor((roll + bonus+5 - 10) / 5);
        }else {
            deg = Math.floor((roll + bonus - 10) / 5);
        }
        if(deg>=0){
            response+=(deg+1)+" degrees of success!";
            if(deg+1>=3){
                response+=" That's a **+5** to the leader's roll!";
            }else{
                response+=" That's a **+2** to the leader's roll!";
            }
        }else{
            response+=deg+" degrees of failure!";
            if(deg<=-2){
                response+=" That's a **-2** to the leader's roll!";
            }else{
                response+=" That does nothing!"
            }
        }
        return message.channel.send(response);
    }
}