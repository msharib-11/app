//Create 20 new Accounts Records in salesforce with at least 5 fields filled.

public class Account20 {
    public static void creAccount(){
        List <Account> accList = new List<Account>();
        for(integer i=0; i<20; i++){
            Account acc = new Account();
            acc.Name = 'HCL '+i;
            acc.AccountNumber = 'HCL00'+i;
            acc.Type = 'Technology';
            acc.Rating = 'cold';
            accList.add(acc);
        }
        insert accList;
    }
}