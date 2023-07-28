public with sharing class FetchingDetailsTask3Controller {
    @AuraEnabled 
    public static List<User> getUserDetails() {
        Id uId =  UserInfo.getUserId();
        List<User> uList = [select Id, Name, Email, FullPhotoUrl From User where Id =: uId limit 1];
        System.debug(uList);
        return uList;
    }

    @AuraEnabled 
    public static List<Contact> getContacts(){
        List<Contact> ConList = [select Id, LastName, Email, Phone, ActiveCon__c from contact];
        return conList;
    }

    @AuraEnabled 
    public static List<Contact> getContactStatus(string activeVal){
        if(activeVal == 'active'){
            return [select Id, LastName, Email, Phone, ActiveCon__c from contact where ActiveCon__c = 'yes'];
        }
        else if(activeVal == 'inactive'){
            return [select Id, LastName, Email, Phone, ActiveCon__c from contact where ActiveCon__c = 'no']; 
        }
        else {
            return [select Id, LastName, Email, Phone, ActiveCon__c from contact];
        }
    }

    @AuraEnabled
    public static List<Contact> findByName(String searchKey) {
        String name = '%' + searchKey + '%';
        return [select Id, LastName, Email, Phone, ActiveCon__c from contact Where LastName Like :name];
    }

    // @AuraEnabled 
    // public static string delContact(string conId){
    //     try {
    //         contact con = [select Id from contact where Id = :conId];
    //         system.debug(conId);
    //         delete con;
    //         return 'Contact deleted';
    //     }
    //     catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    @AuraEnabled 
    public static void sendEmail(Id recordId, Id createdId){
        try {
            Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
            List<String> addresses=new List<String> {userInfo.getUserEmail()};
            mail.setToAddresses(addresses);
            mail.setSubject('Contact records');
            if(recordId != null){
                mail.setHtmlBody('<p>A new Contact record has been created with recordId</p>'+ recordId);     
            }
            else if(createdId != null){
                mail.setHtmlBody('<p>A new Contact record has been created with recordId</p>'+ createdId);     
            }
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        } 
        catch (EmailException e) {
            system.debug(e.getMessage());
        }      
    }
}