// Send an Email to the system Admin with the list of those Leads with details.

global class Task12_07 implements Database.Batchable<sObject>{
    global List <Lead> start(Database.BatchableContext bc){
        date d1 = date.today().addDays(-1);
        List <Lead> lList = [select id, name from Lead where createdDate =last_n_days:1 and phone = NULL];
        return lList;
    }
    global void execute(Database.BatchableContext bc, List <Lead> lList){
               	try{
            List<Lead> LeadList= (List<Lead>) lList;
            
            User adminUser = [SELECT Id, FirstName, LastName, Email FROM User WHERE IsActive = true AND Profile.Name = 'System Administrator' LIMIT 1];
            Messaging.SingleEmailMessage email=new Messaging.SingleEmailMessage();
            String[] toaddress=new String[]{adminUser.Email};
            Email.setToAddresses(toaddress);
            String sub='Detail of leads';
            email.setSubject(sub);
            String body='Hi'+adminUser.FirstName +' '+ adminUser.LastName+'Hello Admin..!! List of Lead with deatils having no phone number:'+lList;
            email.setHtmlBody(body);
            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});

        }
        catch(Exception e){
            system.debug(e);
        }
    }
    global void finish(Database.BatchableContext bc){
        
    }
}