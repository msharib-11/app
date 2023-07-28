//  Write a trigger to not let the person lend more than $50000 in total. Throw an error 
// "You can not take a loan more than $50000."" 
public class Bs_trigger10 {
	public static void function(List<Loan_Data__c> ldList){
        for(Loan_Data__c ld : ldList){
            List<AggregateResult> data = [SELECT Name, SUM(Loan_Amount__c)SUMS FROM Loan_Data__c WHERE PersonAccount__c =: ld.PersonAccount__c AND Loan_Status__c = 'Acitve' Group by Name];
            Integer sum  = Integer.valueOf(data[0].get('sums'));
            if(sum + ld.Loan_Amount__c > 50000){
                ld.addError('Your loan amount is more than 50000 ');
            } 
        }
    }
}