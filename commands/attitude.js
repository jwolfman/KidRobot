/**
 * Created by joshwolfman on 6/17/19.
 */
module.exports={
    name:'attitude',
    description:'Make a persuasion roll to improve a target\'s attitude towards you.',
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
        response+=" against a DC of 15 for ";
        var deg;
        if(roll==20){
            deg = Math.floor((roll + bonus+5 - 15) / 5);
        }else {
            deg = Math.floor((roll + bonus - 15) / 5);
        }
        if(deg>=0){
            var change=Math.floor(deg/2)+1;
            response+=(deg+1)+" degrees of success! That's "+change+" steps!";
        }else{
            response+=-1*deg+" degrees of failure!";
            if(deg<=2){
                response+=" That worsens their attitude by a step!";
            }
        }
        return message.channel.send(response);
    }
}