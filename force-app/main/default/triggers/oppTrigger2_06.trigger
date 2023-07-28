trigger oppTrigger2_06 on Opportunity (before insert) {
    if(trigger.isbefore && trigger.isinsert){
        handlerclass06_2.opp(trigger.new);
    }
}