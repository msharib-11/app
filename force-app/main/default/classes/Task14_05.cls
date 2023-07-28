// Write a script to get all Accounts that are associated with opportunity and put the attachment from account to their opportunity. 
// If the account does not have attachment, put, opportunity close loss otherwise close won. 

public class Task14_05 {
    public static void AccOppAtt(){
        List <Account> accList = [select id, name from Account];
        List <Attachment> atList = [select id, ParentId From Attachment where ParentId IN :accList];
        
        Set <id> acId = new set<id>();
        for(Attachment at: atList){
            acId.add(at.ParentId);
        }
        List <opportunity> oList1 = [select id from opportunity where AccountId IN :acId];
        List <opportunity> oList2 = [select id from opportunity];
        List <Attachment> newAtList = new List <Attachment>();
        
        for(Attachment at: atList){
            for(opportunity o: oList1){
                If(at.ParentId == o.AccountId){
                    Attachment attach = new Attachment();
                    attach.Body = at.Body;
                    attach.Name = at.Name;
                    attach.ParentId = o.Id;
                    newatList.add(attach);
                }
                Insert newAtList;
            }
        }
        for(opportunity ol2: oList2){
            for(opportunity ol1: oList1){
                if(ol2.id == ol1.id){
                    ol1.stageName = 'Close won';
                }
                else{
                    ol1.stageName = 'Close loss';
                }
            }
        }
    }
}