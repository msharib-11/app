trigger campTrigger8_06 on Campaign (after update) {
    if(trigger.isafter && trigger.isupdate){
        handlerclass8_06.camp(trigger.new);
    }
}