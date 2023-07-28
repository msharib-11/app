trigger oppoTrigger6_06 on Opportunity (before update) {
    if(trigger.isupdate && trigger.isbefore){
        handlerclass06_06.oppo(trigger.new);
    }
}