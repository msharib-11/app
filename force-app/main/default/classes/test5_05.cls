@isTest
public class test5_05 {
	@TestSetup
    public static void function(){
        Account ac = new Account();
        ac.name = 'Acctest5';
        insert ac;
        List <opportunity> oList = new List <opportunity>();
        for(integer i=1; i<=3; i++){
            opportunity op = new opportunity();
            op.AccountId = ac.id;
            op.Name = 'optest'+i;
            op.CloseDate = date.today();
            op.StageName = 'closed won';
            oList.add(op);
        }
        insert oList;
    }
    @istest
    public static void method(){
        test.startTest();
        Task5_05.method();
        test.stopTest();
        
        //also we can take Account of List instead of a single Account
        Account aList = [select name, (select name, stageName, closeDate from opportunities where stageName = 'closed won') from Account];
        system.assertEquals('Acctest5', aList.name, 'err');
    }
}