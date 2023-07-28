// In Account Object create a Multi picklist "Working in (ASIA, EMA, NA, SA)" 
// Multipicklist. Write a script to get the total Quantity of Products sold in only Accounts working in ASIA.

public class Task09_05 {
    public static void totalQuantity(){
		List <Opportunity> resList = [select Account.name, TotalOpportunityQuantity From Opportunity where Account.working_in__c = 'ASIA' And stageName = 'Closed won'];
        for(Opportunity opp: resList){
            system.debug(opp.Account.name + ' Quantity - ' + opp.totalOpportunityQuantity);
        }
    }    
}