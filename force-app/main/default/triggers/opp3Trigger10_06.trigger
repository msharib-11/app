trigger opp3Trigger10_06 on Opportunity (before update) {
    if(trigger.isupdate && trigger.isbefore){
        handlerclass10_06.oppline(trigger.new);
    }
}