trigger appTriggerBs_9 on Appointment__c (before insert) {
    if(trigger.isbefore && trigger.isinsert){
        Bs_9.function(trigger.new);
    }
}