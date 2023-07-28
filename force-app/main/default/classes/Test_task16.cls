@istest
public class Test_task16 {
	@Testsetup
    public static void method(){
        opportunity op = new opportunity();
        op.Name = 'New';
        op.StageName = 'Closed name';
        op.CloseDate = date.newInstance(2023, 03, 20);
        insert op;
    }
    @isTest
    public static void func(){
        system.Test.startTest();
        Task16.oppCloseDate();
        system.Test.stopTest();
        
        opportunity oList = [select name, closeDate from Opportunity where closeDate > today];
        system.assertEquals('Newf',oList.name , 'err');
    }
}