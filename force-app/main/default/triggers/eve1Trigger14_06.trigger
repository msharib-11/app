trigger eve1Trigger14_06 on Event_Participent__c (before insert) {
    if(trigger.isbefore && trigger.isinsert){
        handlerclass14_06.event(trigger.new);
    }
}