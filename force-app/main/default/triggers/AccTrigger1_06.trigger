trigger AccTrigger1_06 on Account (after insert) {
    if(trigger.isafter && trigger.isinsert){
        handlerclass06_1.acc(trigger.new);
    }
}