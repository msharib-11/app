@istest
public class Test_cre_acc {
    @isTest
    public static void method(){
        system.Test.startTest();
        cre_acc_cont.creAccount();
        system.Test.stopTest();
        
        List <Account> acList = [select name, id from Account];
        List <contact> conList = [select name, id from contact];
        
        system.assertEquals(10, acList.size(), 'err');
        system.assertEquals(10, conList.size(), 'err');
    }
}