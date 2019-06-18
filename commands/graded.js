/**
 * Created by joshwolfman on 6/17/19.
 */
module.exports={
    name:'graded',
    description:'Make a roll for a general graded check against a set DC',
    usage:'[bonus] [DC]',
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
        var bonus=parseInt(args[0]);
        response+=" with a bonus of "+bonus;
        if(bonus==NaN){
            return message.channel.send("First (bonus) argument must be an integer,"+message.author+"!");
        }
        var DC=parseInt(args[1]);
        response+=" against a DC of  "+DC+" for ";
        if(DC==NaN){
            return message.channel.send("Second (effect rank) argument must be an integer,"+message.author+"!");
        }
        var deg;
        if(roll==20){
            deg = Math.floor((roll + bonus+5 - 15 - rank) / 5);
        }else {
            deg = Math.floor((roll + bonus - 15 - rank) / 5);
        }
        if(deg>=0){
            response+=(deg+1)+" degrees of success!";
        }else{
            response+=deg+" degrees of failure!";
        }
        return message.channel.send(response);
    }
}