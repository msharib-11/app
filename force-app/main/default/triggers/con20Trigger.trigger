trigger con20Trigger on Contact (before insert) {
    if(trigger.isbefore && trigger.isinsert){
        handlerclass20_06.method(trigger.new);
    }
}