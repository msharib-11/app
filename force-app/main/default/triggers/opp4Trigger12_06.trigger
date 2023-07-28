trigger opp4Trigger12_06 on Opportunity (after insert, after update) {
    if(trigger.isafter && trigger.isupdate || trigger.isinsert){
        handlerclass12_06.oppl(trigger.new);
    }
}