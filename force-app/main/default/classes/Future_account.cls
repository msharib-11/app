public class Future_account {
	@future
    public static void countContact(List <Id> accId){
        List <Account> accList = [select id, (select id from contacts) from Account where Id in :accId];
        for(Account acc: accList){
            acc.Number_of_Contacts__c = acc.Contacts.size();
        }
        if(!accList.isEmpty()){
            update accList;
        }
    }
}