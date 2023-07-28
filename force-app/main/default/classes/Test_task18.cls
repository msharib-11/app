@isTest
public class Test_task18 {
    @isTest
    public static void method1(){
        test.startTest();
        Task17.sysAdmin();
        test.stopTest();
        
        Profile proId = [select id from Profile where name = 'System Administrator' limit 1];
        list <user> us = [select id, profileId, Lastname from user where profileId = :proId.Id];
        system.assertEquals(us.size(), 2, 'err');
        system.assertEquals(us[0].Lastname, 'newUser1');
    }
}