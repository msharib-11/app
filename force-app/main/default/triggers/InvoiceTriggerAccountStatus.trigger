trigger InvoiceTriggerAccountStatus on Invoice__c (after insert, after update) {
    if(trigger.isAfter || trigger.isinsert && trigger.isupdate || trigger.isAfter){
        InvoiceAccountStatusApproval.accountStatusApproval(trigger.new);
    }
}