public with sharing class lwcQuestion2 {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetch1() {
        List <Account> accList = [select Id, Name, (select Id, Name From opportunities), (select Id, Name From Contacts) From Account];
        return accList;
    }
}