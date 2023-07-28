trigger Bs_2trigger on Opportunity (before insert) {
    if(trigger.isbefore && trigger.isinsert){
        Bs_2.function(trigger.new);
    }
}