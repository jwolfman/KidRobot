/**
 * Created by joshwolfman on 6/17/19.
 */
function read(args){
    var temp=eval(args);
    console.log(temp);
    if(temp===undefined){
        return 0;
    }
    return temp;
}module.exports={
    name:'healing',
    description:'Make a roll to heal a target of bruises.',
    aliases:['heal'],
    usage:'[bonus]',
    execute:function(message,args){
        var response=message.author;
        var roll=Math.floor(Math.random()*20+1);
        response+=" rolled "+roll;
        if(roll==20){
            response+=" to crit";
        }
        var bonus=read(args[0]);
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
            response+=-1*deg+" degrees of failure! Which heals nothing!";
        }
        return message.channel.send(response);
    }
}