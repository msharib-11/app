public class Bs_1 {
    public static void function(){
        List <opportunity> oList1 = [select id, AccountId, stageName from opportunity where AccountId != NULL];
        set <id> sId = new set <id>();
        for(opportunity op: oList1){
            sId.add(op.AccountId);
        }
        List <Account> accList = [select id from Account where id in: sId];
        for(Account a: accList){
            integer i = 0;
            for(opportunity op: oList1){
                if(op.StageName != 'closed won' || op.StageName != 'closed lost'){
                    i++;
                }
            }
            if(i>0){
                a.No_open_opps__c = TRUE;
            }
            update a;
        }
    }
}