trigger Product2_Trigger2 on Product2 (After insert) {
    if(trigger.isAfter && trigger.isInsert){
        HandlerClass_product2.HandlerMethod(trigger.new);
    }
}