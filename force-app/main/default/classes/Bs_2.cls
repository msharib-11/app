public class Bs_2 {
    public static void function(List <opportunity> oList){
        for(opportunity op: oList){
            if(op.Amount > 50000){
                Account a = [select id, name, Owner.Email from Account where id = :op.AccountId];
                
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                String[] toadd = new String[]{a.Owner.Email};
            	email.setToAddresses(toadd);
            	email.setSubject('Mail having Opportunity');
            	email.setPlainTextBody('Dear sir '+ 'Amount is '+ op.Amount);
            	Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
            }
        }
    }
}