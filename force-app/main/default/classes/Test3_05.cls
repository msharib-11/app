@isTest
public class Test3_05 {
	@testSetup
    public static void function(){
        Lead ld = new Lead();
        ld.LastName = 'Lead 1';
        ld.Company = 'cloud A';
        ld.Status = 'open - connected';
        ld.Records1__c = 'Buyer';
        insert ld;
    }
    @isTest 
    public static void method(){
        test.startTest();
        Task3_05.fetch();
        test.stopTest();
        
        Lead ld = [select Lastname from lead where Records1__c includes ('Buyer', 'Seller') and CreatedDate = THIS_YEAR];
        system.assertEquals('Lead 1', ld.LastName, 'err');
    }
}