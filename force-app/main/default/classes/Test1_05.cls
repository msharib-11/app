@isTest
public class Test1_05 {
    @Testsetup
    public static void function(){
        opportunity op = new opportunity();
        op.name = 'opp1';
        op.closeDate = date.today();
        op.stageName = 'closed won';
        insert op;
    }
	@isTest
    public static void method(){
        test.startTest();
        Task1_05.OppClone1();
        test.stopTest();
        
        opportunity op = [select name from opportunity where name like '%Clone%'];
        system.assertEquals('opp1Clone', op.Name);
    }
}