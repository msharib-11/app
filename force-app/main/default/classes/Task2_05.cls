// Write a Script to get all the Accounts having Oppotunity Line Items Quantity > 100 under their Opportunities(CLOSED WON only).

public class Task2_05 {
    public static void getAccountOpportunity(){
        List <OpportunityLineItem> oppList = [select id, opportunity.AccountId from OpportunityLineItem where Quantity > 100 AND opportunity.stageName = 'Closed Won'];
        set <ID> accID = new set <ID>();
        for(OpportunityLineItem olt: oppList){
            accID.add(olt.Opportunity.AccountId);
        }
        List <Account> accList = [select Id, name From Account where id in :accId];
        for(Account acc: accList){
            system.debug(acc);
        }
    }
}