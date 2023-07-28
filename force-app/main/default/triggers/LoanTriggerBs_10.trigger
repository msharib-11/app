trigger LoanTriggerBs_10 on Loan_Data__c (after insert) {
    if(trigger.isafter && trigger.isinsert){
        Bs_trigger10.function(trigger.new);
    }
}