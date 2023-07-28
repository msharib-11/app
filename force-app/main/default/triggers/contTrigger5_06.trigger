trigger contTrigger5_06 on Contact (after delete) {
    if(trigger.isdelete && trigger.isafter){
        handlerclass06_05.cont(trigger.old);
    }
}