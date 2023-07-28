// Write an Apex script that queries all "Opportunity" records with a "StageName" value of "Closed Lost", 
// and creates a new "Account" record for each opportunity with the same name as the opportunity and the billing address based on the opportunity's "BillingAddress" field.

public class A9_3 {
    public static void oppCreateAcc(){
        List <opportunity> opList = [select id, name, Billing_Address__StateCode__s, Billing_Address__CountryCode__s, Billing_Address__City__s from Opportunity where StageName = 'Closed Lost'];
        List <Account> acList = new List <Account>();
        for(Opportunity op: opList){
            Account ac = new Account();
            ac.Name = op.Name;
            ac.BillingState = op.Billing_Address__StateCode__s;
            ac.BillingCountry = op.Billing_Address__CountryCode__s;
            ac.BillingCity = op.Billing_Address__City__s;
            acList.add(ac);
        }
        insert acList;
    }
}