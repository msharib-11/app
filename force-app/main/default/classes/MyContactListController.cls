public class MyContactListController {
	@AuraEnabled
    public static List<Contact> getContacts(Id recordId) {
        return [Select Id, FirstName, Lastname, Email, Phone From Contact Where AccountId = :recordId];
    }
}