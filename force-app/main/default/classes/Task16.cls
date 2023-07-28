// Update all Opportunity with future Closed Date by Opportunity Name=Opportunity Name + 'F'

public class Task16 {
    public static void oppCloseDate(){
        List <opportunity> oppList = [select name, closeDate from Opportunity where closeDate > today];
    	for(opportunity op: oppList){
        	op.Name = op.Name+'f';
    	}
        update oppList;
    }
}