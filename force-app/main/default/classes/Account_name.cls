// Print the Account Names in Alphabetical accending order.

public class Account_name {
    public static void acc_name(){
        List <Account> accList = [SELECT name From account ORDER BY name ASC];
        for(Account ac: accList){
            system.debug(ac);
        }
    }
}