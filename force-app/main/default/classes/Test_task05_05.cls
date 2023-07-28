@istest
public class Test_task05_05 {
	@testSetup
    public static void setup(){
        Account acc = new Account();
        acc.Name = 'abc';
        insert acc;
        
        List <opportunity> oppList = new List <opportunity>();
        for(integer i=0; i<=4; i++){
            opportunity opp = new opportunity();
            opp.CloseDate = Date.newInstance(2023, 02, 11);
            opp.StageName = 'Closed won';
            opp.Name = 'abc';
            opp.AccountId= acc.Id;
            oppList.add(opp);
        }
        insert oppList;
    }
    
    @isTest
    public static void methodTest(){
        system.Test.startTest();
        Task5_05.method();
        system.Test.stopTest();
        
        List <Account> list1 = [select name, (select name, stageName, closeDate from opportunities where stageName = 'closed won') from Account];
        integer i = list1.size();
        system.assertEquals(1, i, 'error');
    }
}