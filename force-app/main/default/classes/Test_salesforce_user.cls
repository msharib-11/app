@isTest
public class Test_salesforce_user {
	
    @isTest
    public static void method1(){
        system.Test.startTest();
        String s = salesforce_user.currentuser();
        system.Test.stopTest();
        system.assertEquals('newUser1', s, 'Error');
    }
}