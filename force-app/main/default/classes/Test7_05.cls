@isTest
public class Test7_05 {
    @Testsetup
    public static void func1(){
        Account ac = new Account();
        ac.Name = 'acc';
        ac.NumberOfEmployees = 220;
        ac.Working_in__c = 'ASIA; NA';
        insert ac;
    }
    @isTest
    public static void func2(){
        test.startTest();
        Task07_05.getEmployee();
        test.stopTest();
        
        Account a = [select name, NumberOfEmployees from Account where working_in__c Includes ('ASIA; NA')];
        system.assertEquals(220, a.NumberOfEmployees, 'err');
    }
}