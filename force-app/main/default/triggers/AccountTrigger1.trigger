trigger AccountTrigger1 on Account (after insert) {
    if(trigger.isinsert && trigger.isafter){
        Question1HandlerClass.answer1Handler(trigger.new);
    }
}