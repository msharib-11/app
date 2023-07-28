public with sharing class JsApexClass {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [Select Id, LastName, Phone, Email, ActiveCon__c from Contact];
    }
}