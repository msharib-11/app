public class Handlerclass21_06 {
    public static void method(List <contact> conList){
        for(contact c: conList){
            List <contact> conList1 = [select id, Accountid, Account.Allow_multiple__c from contact where Account.Allow_multiple__c = false and Accountid =: c.AccountId];
            if(conList1.size()>=1){
                c.adderror('Do not allow to add more contact');
            }
        }
    }
}