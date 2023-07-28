// Write a script to send Email to all users which are having more than 100 Account (Having 
// phone number) and 30 contacts(Having email address).

public class Task12_05 {
    public static void email(){
        try {
			List <AggregateResult> cList = [select owner.userName From contact where email != NULL and Account.phone != NULL Group By owner.userName having count(id)>2 and count(accountId)>2];
        	List <string> str = new List <string>();
            for(AggregateResult a: CList){
                string s = String.valueOf(a.get('UserName'));
                system.debug(s);
                str.add(s);
            }
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setToAddresses(str);
            email.setSubject('Mail having that having Accounts and contacts');
            email.setPlainTextBody('Dear ' + ',\n\nCongratulations! You have Accounts and contacts');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
        }
        catch (Exception e){
            system.debug(e.getMessage());
        }
    }
}