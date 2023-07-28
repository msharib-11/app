public class handlerclass7_06 {
	public static void oppConRole(list<Opportunity> oppList){
        list<OpportunityContactRole> crList=new list<OpportunityContactRole>();
        for(Opportunity opp:oppList){
            list<Contact> conList=[Select id from Contact where accountid=:opp.accountid];
            for(Contact con:conList){
                OpportunityContactRole cr = new OpportunityContactRole();
                cr.ContactId=con.id;
                cr.OpportunityId=opp.id;
                cr.Role='other';
                crList.add(cr);
            }
        }
        insert crList;
    }
}