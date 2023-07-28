@isTest
public class Test_task11 {
	@testSetup
    public static void method1(){
		contact con = new contact();
        con.Email = 'md.sharib@cloudanalogy.com';
        con.LastName = 'Contact';
        insert con;
    }
    @isTest
    public static void method2(){
        system.Test.startTest();
        string x = Task11.conUser();
        system.Test.stopTest();
        system.assertEquals('md.sharib@cloudanalogy.com', x, 'Error');
    }
}