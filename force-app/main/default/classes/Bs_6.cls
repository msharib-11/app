public class Bs_6 {
    public static void function(){
        date d1 = date.newInstance(2023, 03, 01);
        date d2 = date.newInstance(2023, 03, 30);
        List <Account> acList = [select name, id, (select id from opportunities where Accountid != NULL and stagename = 'Closed won' and closeDate > :d1 and closeDate < :d2) from Account];
        for(Account a: acList){
            if(a.opportunities.size()>10){
                system.debug(a.name);
            }
        }
    }
}