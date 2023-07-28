public class attachment20_04 {
    public static void attach(){
        List <Account> accList = [select id from Account];
        List <contact> conList = [select Account.id from contact where Account.id in :accList];
        List <Attachment> atList = [select id, ParentId from attachment where ParentId in :accList];
        List <Attachment> newAt = new List <Attachment>();
        for(Attachment at: atList){
            for(Contact con: conList){
                if(con.Accountid == at.ParentId){
                    Attachment atm = new Attachment();
                    atm.Name = at.name;
                    atm.Body = at.body;
                    atm.ParentId = con.id;
                    newAt.add(atm);
                }
            }
        }
        insert newAt;
    }
}