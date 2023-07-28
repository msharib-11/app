public with sharing class FormControllerClass {

    // @AuraEnabled
    // public static void saveDataAcc(string obj, string objName){
    //     try {
            
    //         SObject ob = (SObject)JSON.deserialize(obj, );
            

    //         database.insert(ob, false);

    //     } 
    //     catch (Exception e) {

    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    @AuraEnabled
    public static void saveDataAcc(Account acc) {
        if(acc!=NULL){
            insert acc;
            // EmailTemplate emailTemp=[SELECT Id, Name, Subject, Body FROM EmailTemplate WHERE Name='Account Record'];
            Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
            List<String> addresses=new List<String> {userInfo.getUserEmail()};
            mail.setToAddresses(addresses);
            mail.setSubject('New record created');
            mail.setHtmlBody('<p>A new account record has been created.</p><table><tr><th>Id</th><br><th>Name</th><br><th>Active in</th><br><th>Date of creation</th><br><th>Created Date Time</th></tr><tr><td>'+acc.Id+'</td><br><td>'+acc.Name+'</td><br><td>'+acc.Active__c+'</td><br><td>'+acc.Created_Date__c+'</td><br><td>'+acc.Created_date_time__c+'</td></tr></table><br><p>Thanks and regards<br>Cloud Analogy</p>');           
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        } 
    } 

    @AuraEnabled
    public static void saveDataCon(Contact con) {
       if(con!=NULL){
        insert con;
        // EmailTemplate emailTemp=[SELECT Id, Name, Subject, Body FROM EmailTemplate WHERE Name='Account Record'];

        Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
        List<String> addresses=new List<String> {userInfo.getUserEmail()};
        mail.setToAddresses(addresses);
        mail.setSubject('New record created');
        mail.setHtmlBody('<p>A new Contact record has been created.</p><table><tr><th>Id</th><br><th>Name</th><br><th>Active in</th><br><th>Date of creation</th><br><th>Created Date Time</th></tr><tr><td>'+con.Id+'</td><br><td>'+con.LastName+'</td><br><td>'+con.ActiveCon__c+'</td><br><td>'+con.Birthdate+'</td><br><td>'+con.Creation_date_time__c+'</td></tr></table><br><p>Thanks and regards<br>Cloud Analogy</p>');           
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
       }
    }
}