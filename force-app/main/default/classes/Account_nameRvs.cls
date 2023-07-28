public class Account_nameRvs {
    public static void reverse(){
        List<Account> accList = [select name FROM Account];
        for(Account ac: accList){
            string str = ac.Name;
            ac.Name = str.reverse();
            system.debug(ac.Name);
        }
    }
}