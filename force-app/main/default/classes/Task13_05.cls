// Create an Object "Event" (Name Default field and "Event Date" Date time field). Another Junction Object "Event Participant" with 3 fields 1. 
// lookup Contact 2. lookup Event 3. multipicklist ("Attendee Contact", "Presenter Contact","Organizer Contact") 
// write a script to create 10 "Event Participant" 4 with Attendee picklist, 4 with Presenter, 2 with organizer. 

public class Task13_05 {
    public static void event(){
        try {
            List <Event_Participent__c> eList = new List <Event_Participent__c>();
            Event__c eve = new Event__c();
            eve.name = 'Holi';
            eve.Event_Date__c = date.today();
            insert eve;
            
            List <contact> conList = [Select id, name From contact Limit 10];
            for(integer i=0; i<10; i++){
                Event_Participent__c ep = new Event_Participent__c();
                if(i<4){
                    ep.Contact_e__c = conList[i].id;
                    ep.Event__c = eve.id;
                    ep.contact_List__c = 'Attendee Contact';
                    eList.add(ep);
                }
                else if(i>=4 && i<8){
                    ep.Contact_e__c = conList[i].id;
                    ep.Event__c = eve.id;
                    ep.contact_List__c = 'Presenter Contact';
                    eList.add(ep);
                }
                else {
                    ep.Contact_e__c = conList[i].id;
                    ep.Event__c = eve.id;
                    ep.contact_List__c = 'Organizer Contact';
                    eList.add(ep);
                }
            }
            insert eList;
        }
        catch(exception e){
            system.debug(e.getMessage());
        }
    }
}