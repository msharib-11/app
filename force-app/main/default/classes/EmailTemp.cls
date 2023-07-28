public class EmailTemp {
    public static void sendEmailwithTemplate(){
        List <Messaging.SingleEmailMessage> mailList = new List<Messaging.SingleEmailMessage>();
        EmailTemplate emailTemp = [Select id, subject, body From EmailTemplate where Name= 'NoidaCloud24'];
        Contact con = [select id, Name FROM Contact where Name like 'so%' limit 1];
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setTemplateId(emailTemp.Id);
        mail.setTargetObjectId(con.id);
        mailList.add(mail);
        if(!mailList.isEmpty()){
            Messaging.sendEmail(mailList);
        }
    }
}