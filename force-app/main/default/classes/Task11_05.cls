// Write a script to get all the Accounts having more than 10 opportunities whose status is 
// closed won and the close date is between one month. 

public class Task11_05 {
    public static void get_AccOpp(){
        date startDate = date.newInstance(2023, 03, 02);
        date endDate = date.newInstance(2023, 04, 02);
        List <Account> accList = [select name, id, (select id from opportunities where Accountid != NULL and stagename = 'Closed won' and closeDate > :startDate and closeDate < :endDate) from Account];
        for(Account a: accList){
            if(a.opportunities.size()>=2){
                system.debug(a.name);
            }
        }
    }
}