public class Acc_Attachment1 {
    public static void Account_attach_con(){
        List <Account> AcList = [select id from Account];
        List <Attachment> AtList = [select id, parentId from Attachment where parentId in :acList];
        set <Id> acId = new set <Id>();
        for(Attachment At: AtList){
            acId.add(at.ParentId);
        }
        
        List <Contact> conlist = [select id from contact where AccountId in :acId];
        for(Attachment at: AtList){
            for(Contact con: conlist){
                if(at.ParentId==con.AccountId){
                    Attachment atc = new Attachment();
                    atc.Body = at.Body;
                    atc.Name = at.Name;
                    atc.ParentId = con.Id;
                }
            }
        }
    }
}