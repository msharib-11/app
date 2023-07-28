@istest
public class Test4_05 {
	@testsetup
    public static void method(){
        Account ac = new Account();
        ac.Name = 'Account 1';
        ac.Location__c = 'F';
        insert ac;
        Account ac1 = new Account();
        ac1.Name = 'Account 2';
        ac1.Location__c = 'A';
        insert ac1;
        Order_Location__c ol1 = new Order_Location__c();
        ol1.Travel_Loaction__c = 'A';
        insert ol1;
        Order_Location__c ol2 = new Order_Location__c();
        ol2.Travel_Loaction__c = 'B';
        insert ol2;
        Order_Location__c ol3 = new Order_Location__c();
        ol3.Travel_Loaction__c = 'C';
        insert ol3;
        Order_Location__c ol4 = new Order_Location__c();
        ol4.Travel_Loaction__c = 'D';
        insert ol4;
        Order_Location__c ol5 = new Order_Location__c();
        ol5.Travel_Loaction__c = 'E';
        insert ol5;
        Order_Location__c ol6 = new Order_Location__c();
        ol6.Travel_Loaction__c = 'F';
        insert ol6;
    }
    @istest
    public static void function(){
        test.startTest();
        Task04_05.upDateLocation();
        test.stopTest();
        
        List <Account> a = [select id, Location__c from Account where Location__c = 'A'];
        Order_Location__c olList = [select id, name, Total_Distance__c, Travel_Loaction__c from Order_Location__c where Travel_Loaction__c = 'D'];
        
        system.assertEquals(68, olList.Total_Distance__c);
    }
    @istest
    public static void function2(){
        test.startTest();
        Task04_05.upDateLocation();
        test.stopTest();
        
        List <Account> a = [select id, Location__c from Account where Location__c = 'F'];
        Order_Location__c olList = [select id, name, Total_Distance__c, Travel_Loaction__c from Order_Location__c where Travel_Loaction__c = 'E'];
        
        system.assertEquals(73, olList.Total_Distance__c);
    }
}