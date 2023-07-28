// "In Account Object create a Multi picklist ""Working in (ASIA, EMA, NA, SA)"". 
// Write a script to get the total ""No of employees"" of all the Accounts working in ASIA and NA(North America)"

public class Task07_05 {
    public static void getEmployee(){
        List <Account> accList = [select name, NumberOfEmployees from Account where working_in__c Includes ('ASIA; NA')];
        integer j = 0;
        for(Account acc: accList){
            j= j+acc.NumberOfEmployees;
        }
        system.debug(j);
    }
}