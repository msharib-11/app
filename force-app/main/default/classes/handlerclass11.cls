//Write a Trigger to create a default Contact, Case, Opporunity and Contact Role. whenever an Account is 
//created with Number of Employees > 100. Make sure the Contact is in contact field of Case as well as 
//related to Opporutnity inn Contact Role.

public class handlerclass11 {
    public static void accopcc(List <Account> accList){
        for(Account ac: accList){
            if(ac.numberofEmployees >100){
                
                contact con = new contact();
                con.AccountId = ac.id;
                con.LastName = 'contact 123';
                insert con;
                
             	opportunity opp = new opportunity();
                opp.AccountId = ac.id;
                opp.Name = 'opp 1233';
                opp.CloseDate = date.today();
                opp.StageName = 'closed won';
                insert opp;
                
                case cs = new case();
                cs.AccountId = ac.Id;
                cs.ContactId = con.Id;
                cs.Status = 'working';
                cs.Origin = 'web';
                insert cs;
                
                opportunitycontactRole ocr = new opportunitycontactRole();
                ocr.ContactId = con.Id;
                ocr.OpportunityId = opp.Id;
                insert ocr;
            }
        }
    }
}