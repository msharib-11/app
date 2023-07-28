@RestResource(urlMapping = '/api/Account/*')
global with sharing class ApiIntegrationOnAccount {
    @HttpGet
    global static Account doGet() {
        		RestRequest req = RestContext.request;
        		system.debug('req>>>>>>>>>.'+req);
                String AccNumber = req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
                system.debug('accnumber>>>>>>>'+AccNumber);
                Account result = [SELECT Id, Name, Phone, Website FROM Account WHERE ID = :AccNumber];
                
                System.debug(result);
                system.debug('Successful');
                return result;
        }
    
    @HttpPost
    global static String doPost(String name,String phone,String AccountNumber ) {
        Account acc = new Account();
        acc.name= name;
        acc.phone=phone;
        acc.AccountNumber =AccountNumber ;
        insert acc;
        
        system.debug(acc);
        return acc.id;
    }
}