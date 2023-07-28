@isTest
public class Test11_05 {
	@Testsetup
    public static void fun(){
        contact con = new contact();
        con.LastName = 'Con Last';
        con.Email = 'md.sharib@cloudanalogy.com';
        insert con;
    }
    @isTest
    public static void func(){
        test.startTest();
        Task11.conUser();
        test.stopTest();
        
        contact con = [Select name, email from Contact];
        user u = [select email from user where email like 'md%' Limit 1];
        system.assertEquals(u.email, con.Email, 'err');
    }
}