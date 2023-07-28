trigger oppo2Trigger7_06 on Opportunity (after insert) {
    if(trigger.isafter && trigger.isinsert){
        handlerclass7_06.oppConRole(trigger.new);
    } 
}