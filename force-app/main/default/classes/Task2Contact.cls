public with sharing class Task2Contact {
    @AuraEnabled (cacheable=true)
    public static List<Contact> getContacts(string searchValue, string sortfield, string sortOrder, string activeVal) {
        // system.debug('1');
        string query1 = 'Select Id, LastName, Phone, Email, ActiveCon__c from Contact';
        // system.debug('2');
        if(searchValue != null){          // system.debug('3');
            string key = '%' + searchValue + '%';
            system.debug(key);
            query1 += ' where LastName Like : key';
        }

        if(activeVal != Null){
            query1 += ' And ActiveCon__c = \''+activeVal+'\'';
        }

        if(sortfield != null && sortOrder != null){
            query1 += ' order by ' + sortfield + ' ' + sortOrder;
        }
        system.debug(Database.query(query1));
        return Database.query(query1);
    }

    @AuraEnabled
    public static string getOrgDomain(){
        try {
            return System.Url.getOrgDomainUrl().toexternalform();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled 
    public static string delContact(string conId){
        try {
            contact con = [select Id from contact where Id = :conId];
            system.debug(conId);
            delete con;
            return 'Successful';
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled 
    public static List<user> fetchUser(){
        try{
            Id strId = UserInfo.getUserId();
            List <user> uList = [Select Id, Name, Email, FullPhotoUrl from user where Id =: strId limit 1];
            system.debug(uList);
            return uList;
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled 
    public static void sendEmail(Id recordId, string status){
        Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
        List<String> addresses=new List<String> {userInfo.getUserEmail()};
        mail.setToAddresses(addresses);
        mail.setSubject('Contact records');
        mail.setHtmlBody('<p>A new Contact record has been created with recordId</p>'+ recordId);     
        try {
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        } catch (EmailException e) {
            system.debug(e.getMessage());
        }      
    }
}