public class Create_Ac2 {
    public static void createConAcc(){
        List <Account> accList = new List <Account>();
        accList = [select id, name FROM Account Limit 10];
        integer i = 0;
        List <Contact> conList = new List <Contact>();
        /*
        for(Account acc : accList){
            i++;
            contact con = new contact();
            con.AccountId = acc.Id;
            con.LastName = 'Kumar'+i;
            con.FirstName = 'Avi'+i;
            conList.add(con);
        }
        if(!conList.isEmpty()){
            insert conList;
        }
*/
        for(Contact c : conList){
            system.debug(c.FirstName + ' ' + c.LastName);
        }
        for(Account a : accList){
            system.debug(a.id);
        }
    }
}