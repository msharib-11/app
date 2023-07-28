trigger acc2Trigger11_06 on Account (after insert) {
    if(trigger.isafter && trigger.isinsert){
        handlerclass11.accopcc(trigger.new);
    }
}