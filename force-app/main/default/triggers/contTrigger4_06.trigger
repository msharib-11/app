trigger contTrigger4_06 on Contact (after insert) {
    if(trigger.isafter && trigger.isinsert){
        handlerclass06_4.con(trigger.new);
    }
}