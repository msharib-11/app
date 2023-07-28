trigger con17Trigger17_06 on Contact (before insert) {
    if(trigger.isbefore && trigger.isinsert){
        handlerclass17_06.method(trigger.new);
    }
}