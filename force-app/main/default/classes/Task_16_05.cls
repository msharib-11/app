// Write a script to Send opportunity details to the Account's Contact's email address whose
// close date is 10 days later. 
public class Task_16_05 {
    public static void method(){
        date cldate = date.today().addDays(10);
        List <opportunity> oppList = [select id, name,Accountid , closeDate from opportunity where closeDate > :cldate];
        
        for(opportunity op: oppList){
			List <contact> conList = [select id, email,Accountid from contact where Accountid = :op.AccountId and email != NULL];
            List <string> data = new List <string>();
            if(conList.size() > 0){
            for(contact con: conList){
                data.add(con.email);
            }
            
       
            //System.debug(data);
            
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setToAddresses(data);
            email.setSubject('Mail having Opportunity');
            email.setPlainTextBody('Mail having opportunity greater than 10 days from today');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
        }
        }
    }
}