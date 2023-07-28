// Write a code to clone(copy ) 1 Opportunity with all Opportunity line items into a new 
// Opportunity with Closed Date = Old closed date + 30 days & Opportunity name = 
// Opportunity Name+ 'Clone' 

public class Task1_05 {
    public static void OppClone1(){
		Opportunity opp1 = [select id, Name, StageName, CloseDate, (select id from OpportunityLineItems) From opportunity Limit 1];
    	Opportunity op = opp1.Clone();

        op.closeDate = op.closeDate.addDays(30);
        op.Name = op.Name+'Clone';
        
    	insert op;
        system.debug(op);
    }
}