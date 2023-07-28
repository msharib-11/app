public class AccountOpp {
    public static void program(){
        List<opportunityLineItem> oliList = [select Id, opportunity.AccountId from opportunityLineItem where quantity>100 and
                                            opportunity.stageName = 'Closed won'];
        set <Id> accId = new set <ID>();
        for(opportunityLineItem oli: oliList){
            accId.add(oli.opportunity.AccountId);
        }
        List<Account> accList = [select id, name from Account where id in : accId];
        for(Account ac: accList){
            system.debug(ac.name);
        }
    }
}