public class Bs_3 {
    public static void function(){
        List <Lead> lList = [select id, name from Lead where status != 'Closed converted' LIMIT 15];
        Database.delete(lList, false);
    }
}