public class caseQuery {
    public static void csQuery(){
        List<contact> conList = [select Account.name, name, (select caseNumber from cases) from contact order by name limit 10];
        for(contact con: conList){
            system.debug(con.Account.name + '  ' + con.name);
        
        	for(case contact2: con.cases){
            	system.debug(contact2.caseNumber);
        	}
        }
    }
}