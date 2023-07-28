public class SOSL_1 {
    public static void Search1(){
    	List <List<sObject>> searchList = [Find 'Cloud' IN ALL FIELDS RETURNING Account(name), contact(FirstName, LastName, Email)];
    	List <Account> accList = new List<Account>();
    	List <Contact> conList = new List<Contact>();
    	accList = (List<Account>)searchList[0];
    	conList = (List<Contact>)searchList[1];
        
        for(Account acc: accList){
            system.debug(acc.Name);
        }
        for(Contact con: conList){
            system.debug(con.FirstName + ' ' + con.LastName);
        }
    }
}