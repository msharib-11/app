public class createcase {
    public static void cases(){
        List <contact> conList = [select id, Account.id from contact where AccountId != NULL limit 5];
        List <case> caseList = new List<case>();
        for(contact con: conList){
            case cs = new case();
            cs.AccountId = con.AccountId;
            cs.ContactId = con.Id;
            cs.Status = 'New';
            cs.Origin = 'web';
            caseList.add(cs);
        }
        insert caseList;
    }
}