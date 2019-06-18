/**
 * Created by joshwolfman on 6/17/19.
 */
module.exports={
    name:'affliction',
    description:'Make a roll to resist an affliction.',
    usage:'[bonus] [DC]',
    execute:function(message,args){
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
            deg = Math.floor((roll + bonus+5 - 10 - rank) / 5);
        }else {
            deg = Math.floor((roll + bonus - 10 - rank) / 5);
        }
        if(deg>=0){
            response+=(deg+1)+" degrees of success! No effect!";
        }else{
            response+=deg+" degrees of failure!";
        }
        return message.channel.send(response);
    }
}