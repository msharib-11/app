public with sharing class tast2Getcontact {
    @AuraEnabled 
    public static List<Contact> getcontact() {
        return [select Id, LastName, BirthDate, Phone, Email from Contact limit 15];
    }
}