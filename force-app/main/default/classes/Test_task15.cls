@isTest
public class Test_task15 {
	@Testsetup
    public static void method(){
		List <Account> list1 = new List <Account>();
        for(integer i=1; i<=2; i++){
            Account ac = new Account();
            ac.Name = 'a'+i;
            list1.add(ac);
        }
        insert list1;
        List <contact> conList = new List <contact>();
        for(Account a: list1){
            contact con = new contact();
            con.LastName = 'con 1';
            con.AccountId = a.Id;
            conList.add(con);
        }
        insert conList;
    }
    @istest
    public static void func(){
        system.Test.startTest();
        Task15.del();
        system.Test.stopTest();
        
        List <contact> res = [select id, name from contact where Account.name like '%a%' limit 4999];
        system.assertEquals(0, res.size(), 'err');
    }
}