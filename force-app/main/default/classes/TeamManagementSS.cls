public class TeamManagementSS {
    @AuraEnabled 
    public static List<string> getFields(String objectName, String fieldSetName){
       //List<SObject> results = new List<SObject>();
       //String soqlQuery = 'SELECT ';
       List<string> fieldName = new List<string>();
       Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
       if (objectType != null) {
           Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
           List<Schema.FieldSetMember> fieldSetMembers = objectDescribe.fieldSets.getMap().get(fieldSetName).getFields();
           //system.debug('field Name '+fieldSetMembers);
           
           for (Schema.FieldSetMember field : fieldSetMembers) {
               //soqlQuery += field.getFieldPath() + ', ';
               system.debug('field Name '+field.getFieldPath());
               fieldName.add(field.getFieldPath());
           }

           //soqlQuery = soqlQuery.removeEnd(', ');
           //soqlQuery += ' FROM ' + objectName;
           
           //results = Database.query(soqlQuery);
        }
       system.debug('List of fields '+fieldName);
       //system.debug('resulst'+results);
       
       return fieldName;
    }
}