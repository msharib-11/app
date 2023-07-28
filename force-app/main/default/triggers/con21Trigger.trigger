trigger con21Trigger on Contact (before insert) {
    if(trigger.isbefore && trigger.isinsert){
        Handlerclass21_06.method(trigger.new);
    }
}