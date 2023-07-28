@isTest
public class AccountManagerTest {
	@isTest
    public static void getAccount(){
        Account acc = new Account(name = 'New Acc');
        insert acc;
        Contact con = new Contact(LastName = 'New Con', AccountId = acc.Id);
        insert con;
        
        RestRequest request = new RestRequest();
        request.requestURI = 'https://cloudanalogy-5e6-dev-ed.develop.my.salesforce.com/services/apexrest/Accounts/'+acc.Id+'/Contacts';
        request.httpMethod = 'GET';
        RestContext.request = request;
        Account myAcc = AccountManager.getAccount();
        system.assert(myAcc!=NUll);
        system.assertEquals('New Acc', myAcc.name);
    }
}