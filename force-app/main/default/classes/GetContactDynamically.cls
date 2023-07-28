public class GetContactDynamically {
    @AuraEnabled
    public static List<SObject> executeQuery(String objectName, String fieldSetName) {
        List<SObject> results = new List<SObject>();
        String soqlQuery = 'SELECT ';
        
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
        if (objectType != null) {
            Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
            List<Schema.FieldSetMember> fieldSetMembers = objectDescribe.fieldSets.getMap().get(fieldSetName).getFields();
            
            for (Schema.FieldSetMember field : fieldSetMembers) {
                soqlQuery += field.getFieldPath() + ', ';
            }
            
            soqlQuery = soqlQuery.removeEnd(', ');
            soqlQuery += ' FROM ' + objectName;
            
            results = Database.query(soqlQuery);
        }
        
        system.debug('resulst'+results);
        return results;
    }

    
    @AuraEnabled
    // Create Map of Label and fieldName to use this map in columns of datatable
     public static string getFieldLableAndFieldAPI(){
        system.debug('1 apex');
    List<Map<String ,String>> listOfFieldSet  = new  List<Map<String ,String>>();
    try {
            for(Schema.FieldSetMember fieldset : SObjectType.Contact.FieldSets.task3Fieldset.getFields()) {
                Map<String ,String> lableAPIMap = new Map<String ,String>();
                lableAPIMap.put(fieldset.getLabel(),fieldset.getFieldPath());
                listOfFieldSet.add(lableAPIMap);
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        system.debug('Listoffield>>>>>>>>>>>>>'+listOfFieldSet);
        return JSON.serialize(listOfFieldSet);
    }

    @AuraEnabled
    public static List<SObject> findByName(String objectName, String fieldSetName, String searchKey) {
        List<SObject> results = new List<SObject>();
        String soqlQuery = 'SELECT ';
             
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
        if (objectType != null) {
            Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
            List<Schema.FieldSetMember> fieldSetMembers = objectDescribe.fieldSets.getMap().get(fieldSetName).getFields();
                 
            for (Schema.FieldSetMember field : fieldSetMembers) {
                soqlQuery += field.getFieldPath() + ', ';
            }
                 
            soqlQuery = soqlQuery.removeEnd(', ');
            soqlQuery += ' FROM ' + objectName;
            soqlQuery += ' WHERE Lastname Like  \'%'+ searchkey +'%\'';
                 
            results = Database.query(soqlQuery);
        }
             
        system.debug('resulst'+results);
        return results;
    }

    @AuraEnabled 
    public static List<SObject> getContactStatus(String objectName, String fieldSetName, string activeVal){
        List<SObject> results = new List<SObject>();
        String soqlQuery = 'SELECT ';
             
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
        if (objectType != null) {
            Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
            List<Schema.FieldSetMember> fieldSetMembers = objectDescribe.fieldSets.getMap().get(fieldSetName).getFields();
                 
            for (Schema.FieldSetMember field : fieldSetMembers) {
                soqlQuery += field.getFieldPath() + ', ';
            }
                 
            soqlQuery = soqlQuery.removeEnd(', ');
            soqlQuery += ' FROM ' + objectName;

            if(activeVal == 'active'){
                string str1 = 'yes';
                soqlQuery += ' WHERE ActiveCon__c  = \''+ str1 +'\'';
            }
            else if(activeVal == 'inactive'){
                string str2 = 'no';
                soqlQuery += ' WHERE ActiveCon__c  = \''+ str2 +'\'';
            }
                 
            results = Database.query(soqlQuery);
        }
             
        system.debug('resulst'+results);
        return results;
    }

    @AuraEnabled 
    public static string deleteContact(string conId){
        try {
            contact con = [select Id from contact where Id = :conId];
            system.debug(conId);
            delete con;
            return 'Contact deleted';
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

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