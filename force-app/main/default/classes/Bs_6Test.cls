@isTest
public class Bs_6Test {
	@Testsetup
    public static void function(){
        List <Account> acList = new List <Account>();
        for(integer i=1; i<=2; i++){
            Account acc = new Account();
            acc.Name = 'acc'+1;
            acList.add(acc);
        }
        insert acList;
        
        List <opportunity> opList = new List <opportunity>();
        for(Account ac: acList){
            opportunity op = new opportunity();
            op.AccountId = ac.Id;
            op.Name = 'opp';
            op.CloseDate = date.newInstance(2023, 03, 20);
            op.StageName = 'closed won';
            opList.add(op);
        }
        insert opList;
    }
    @isTest
    public static void function2(){
        system.Test.startTest();
        Bs_6.function();
        system.Test.stopTest();
        
        date d1 = date.newInstance(2023, 03, 01);
        date d2 = date.newInstance(2023, 03, 30);
        List <Account> olist = [select name, id, (select id from opportunities where Accountid != NULL and stagename = 'Closed won' and closeDate > :d1 and closeDate < :d2) from Account];
        system.assertEquals(2, olist.size(), 'err');
    }
}