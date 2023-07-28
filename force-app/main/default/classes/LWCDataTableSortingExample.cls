public class LWCDataTableSortingExample {
    @AuraEnabled(Cacheable=true)
    public static List <Contact> getContacts() {
        List<Contact> contList = [ SELECT Id, FirstName, LastName, Phone, Email
                                   FROM Contact];
        return contList;
    }   

}