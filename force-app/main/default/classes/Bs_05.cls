public class Bs_05 {
	public static void function(){
        List<Account> accList = [SELECT Name, (SELECT Amount FROM Opportunities WHERE stageName = 'closed won' AND CreatedDate = LAST_n_QUARTERS:1) FROM Account];
       
        for(Account acc : accList){
            Decimal sum =0;
            for(Opportunity opp : acc.Opportunities){
                sum = sum + opp.Amount;
            }
            if(sum > 0){
                acc.Last_Quarter_Revenue__c = sum;
                system.debug(acc.Name);
            }
            else{
                acc.Last_Quarter_Revenue__c = 0;
            }
               
        }
    }
}