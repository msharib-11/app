public with sharing class task2fetchContacts {
    @AuraEnabled (cacheable=true)
    public static List<Contact> fetchContact() {
        System.debug('IN');
        string getData = 'select ID, LastName, Phone, Email from Contact';
        System.debug(Database.query(getData));
        return Database.query(getData);
    }
}