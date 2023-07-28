//Write a Script to get all the Accounts having more than 2 Oppotunity Line Items in their Opportunity. 

public class Task08_05 {
    public static void OppLineItem(){
        List <aggregateResult> aggRes = [select opportunity.Account.name, count(id) From OpportunityLineItem where opportunity.Account.name != Null Group by opportunity.Account.name having count(id)>=2];
        for(aggregateResult res: aggRes){
            system.debug(res);
        }
    }
}