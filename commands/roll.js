/**
 * Created by joshwolfman on 7/2/19.
 */
module.exports={
    name:'roll',
    description:'Make a roll.',
    aliases:['r'],
    usage:'[bonus]',
    execute:function(message,args){
        var response=message.author;
        if(args.length>1){
            return message.channel.send("Command can't take more than one input,"+message.author+"!");
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
        response+=" for a total of "+(roll+bonus)+"!";
        if(roll==20){
            response+=" That's an effective "+(roll+bonus+5)+"!";
        }
        return message.channel.send(response);
    }
}