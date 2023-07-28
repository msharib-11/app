@isTest
public class Test_Account20 {
	@isTest
    public static void method1(){
        system.Test.startTest();
        Account20.creAccount();
        system.Test.stopTest();
        
        List <Account> accList = [select name, phone from Account where name like 'HCL%'];
        system.assertEquals(20, accList.size(), 'Error');
    }
}