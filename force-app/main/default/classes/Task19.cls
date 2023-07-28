// WAP to create 5 Case Records with all the values(Account, Contact, etc) filled in.

public class Task19 {
    public static void creCase(){
		Account acc = new Account();
        acc.name = 'Task19';
        insert acc;
        contact conList = new contact();
        conList.AccountId = acc.Id;
        conList.LastName = 'Kumar';
        insert conList;
        
        List <case> caseList = new List <Case>();
            for(integer i=1; i<=5; i++){
                case cs = new case();
            	cs.AccountId = conList.AccountId;
            	cs.ContactId = conList.Id;
            	cs.Status = 'Working';
            	cs.Origin = 'Phone';
            	caseList.add(cs);
            }
        if(!caseList.isEmpty()){
            System.debug(caseList);
            insert caseList;
        }        
    }
}