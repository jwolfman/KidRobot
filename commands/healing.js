/**
 * Created by joshwolfman on 6/17/19.
 */
module.exports={
    name:'',
    description:'',
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
            response+=(deg+1)+" degrees of success! Which heals **"+(deg+1)+" damage conditions** starting from the worst!";
        }else{
            response+=deg+" degrees of failure! Which heals nothing!";
        }
        return message.channel.send(response);
    }
}