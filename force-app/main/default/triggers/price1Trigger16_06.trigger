trigger price1Trigger16_06 on Opportunity (before update) {
    if(trigger.isbefore && trigger.isupdate){
        handlerclass16_06.method(trigger.new);
    }
}