@RestResource(urlMapping='/Accounts/*/Contacts')
global class AccountManager {
    global static Account getAccount(){
        RestRequest request = RestContext.request;
        string accId = request.requestURI.substringBetween('Accounts/','/Contacts');
        system.debug('accId>>>>>>>>>'+accId);
        Account acc = [select Id, name, (select Id, LastName From Contacts) From Account Where Id=:accId limit 1];
        return acc;
    }
}