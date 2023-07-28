// Create a new multi-picklist field In Lead Object"Records" [Buyer, Seller, Tenant , Landlord]. 
// Write a script to fetch all the Sellers and Tenants which are entered this year.

public class Task3_05 {
    public static void fetch(){
        list<Lead> leadList = [select name from lead where Records1__c includes ('Buyer', 'Seller') and CreatedDate = THIS_YEAR];
        for(lead ld: leadList){
            system.debug(ld);
        }
    }
}