public class handlerclass14_06 {
    public static void event(List <Event_Participent__c> epList){
        List<Event_Participent__c> data = [SELECT Contact_e__c, Event__c FROM Event_Participent__c];

        for(Event_Participent__c evp : epList){
            for(Event_Participent__c i :data ){
                if(evp.Contact_e__c == i.contact_e__c && evp.Event__c == i.Event__c){
                   evp.addError('contact already taken');  
                }     
        	}
    	}  
    }
}