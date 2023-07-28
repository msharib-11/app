public with sharing class lwcQuestionSix {
    @AuraEnabled
    public static Contact Fetch(string u, string p){
        try {
            Contact con  = [select Id,Name from contact where username__c=:u and password__c=:p];
                return con;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
     
}