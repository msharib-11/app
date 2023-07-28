@isTest
public class Bs_test {
    @isTest
    public static void function(){
        PersonAccount__c pr = new PersonAccount__c();
        pr.PA_Name__c = 'test';
        insert pr;
        
         Loan_Data__c ld = new Loan_Data__c();
         ld.Name__c = 'loanTest';
         ld.Loan_Amount__c = 60000;
         ld.Loan_Status__c = 'active';
         ld.PersonAccount__c = pr.id;
        
        
        Test.startTest();
        
        Database.SaveResult result = Database.insert(ld,false);
        Test.stopTest();
        
        System.assert(!result.isSuccess());
        
    }
}