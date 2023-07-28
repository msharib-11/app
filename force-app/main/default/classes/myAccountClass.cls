public with sharing class myAccountClass {
    @AuraEnabled (cacheable = true)
    public static List<Account> getAcc(string text) {
        string str = '%'+text+'%';
        List<Account> accList = [select Id, Name from Account where Name like :str];
        //system.debug(accList);
        return accList;
    }
}