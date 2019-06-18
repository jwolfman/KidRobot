/**
 * Created by joshwolfman on 6/17/19.
 */
module.exports={
    name:'toughness',
    description:'Make a toughness roll based on a bonus and the ranks of the damage effect',
    execute:function(message, args){
        var response=message.author;
        if(args.length!=2){
            return message.channel.send("Command needs a bonus and rank as input,"+message.author+"!");
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
        var rank=parseInt(args[1]);
        response+=" against a rank "+rank+" effect for ";
        if(rank==NaN){
            return message.channel.send("Second (effect rank) argument must be an integer,"+message.author+"!");
        }
        var deg;
        if(roll==20){
            deg = Math.floor((roll + bonus+5 - 15 - rank) / 5);
        }else {
            deg = Math.floor((roll + bonus - 15 - rank) / 5);
        }
        if(deg>=0){
            response+=(deg+1)+" degrees of success! No effect!";
        }else{
            response+=deg+" degrees of failure!";
            switch(deg){
                case -1:
                    response+=" That's a **Bruise**!";
                    break;
                case -2:
                    response+=" That's a **Bruise** and **Dazed**!";
                    break;
                case -3:
                    response+=" That's a **Bruise** and **Staggered**!";
                    break;
                case -4:
                default:
                    response+=" That's **Incapacitated**!";
                    break;
            }
        }
        return message.channel.send(response);
    }
};