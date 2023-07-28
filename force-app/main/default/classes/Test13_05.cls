@isTest
public class Test13_05 {
    @testSetup
    public static void func(){
        Event__c eve = new Event__c();
        eve.name = 'Holi';
        eve.Event_Date__c = date.today();
        insert eve;
        
        contact con = new contact();
        con.LastName = 'conLast';
        insert con;
        
        List <Event_Participent__c> eList = new List <Event_Participent__c>();
        for(integer i=0; i<2; i++){
            Event_Participent__c ep = new Event_Participent__c();
        	ep.Contact_e__c = con.id;
        	ep.Event__c = eve.id;
        	ep.contact_List__c = 'Attendee Contact';
        	eList.add(ep); 
        }
        insert eList;
    }
	@istest
    public static void fun(){
        test.startTest();
        Task13_05.event();
        test.stopTest();
        
        List <Event_Participent__c> e = [select contact_List__c from Event_Participent__c];
        system.assertEquals(2, e.size());
    }
}