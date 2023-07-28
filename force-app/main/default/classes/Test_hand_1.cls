@istest
public class Test_hand_1 {
    @isTest
    public static void func(){
        Account acc = new Account();
        acc.Name = 'new test acc';
        acc.NumberOfEmployees = 10;
        
        
        system.Test.startTest();
        insert acc;
        system.Test.stopTest();
        List <contact> conList = [select id from contact where Accountid = :acc.Id];
        system.assertEquals(10, conList.size(), 'Error');
    }
}