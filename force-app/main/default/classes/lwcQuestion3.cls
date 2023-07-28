public with sharing class lwcQuestion3 {
    @AuraEnabled
    public static void func(string oId, Date cDate){
        Opportunity opp = [select Id, Name, CloseDate From Opportunity where Id = :oID];
        opp.CloseDate = cDate;
        update opp;
    }
}