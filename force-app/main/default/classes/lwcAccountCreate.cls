public with sharing class lwcAccountCreate {
    @AuraEnabled
    public static Account Create(string n, string p) {
        Account acc = new Account();
        acc.Name = n;
        acc.Phone = p;
        insert acc;
        return acc;
    }
}