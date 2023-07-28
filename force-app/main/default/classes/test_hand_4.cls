@istest
public class test_hand_4 {
	@istest
    public static void fun(){
        Account acc = new Account();
        acc.name = 'newAccount';
        insert acc;
        contact con = new contact();
        con.Accountid = acc.Id;
        con.FirstName = 'con';
        con.LastName = 'Last';
        
        system.Test.startTest();
        insert con;    
        system.Test.stopTest();
        
        Account ac = [select name from Account where name Like 'newAccount%'];
        system.assertEquals('newAccountLast', ac.Name, 'err');
    }
}