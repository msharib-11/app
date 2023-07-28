public class RecordCreationTM {
    @AuraEnabled(cacheable=false)
    public static List<String> getFields(String objectName, String fieldSetName){
        try {
            List<String> fieldName = new List<String>();
            Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
            if (objectType != null) {
                Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
                List<Schema.FieldSetMember> fieldSetMembers = objectDescribe.fieldSets.getMap().get(fieldSetName).getFields();
                for (Schema.FieldSetMember field : fieldSetMembers) {
                    system.debug('field Name '+field.getFieldPath());
                    fieldName.add(field.getFieldPath());
                }
            }
            system.debug('List of fields '+fieldName);       
            return fieldName;
        } 
        catch (Exception e) {
            AuraHandledException excep = new AuraHandledException(e.getMessage());
            excep.setMessage(e.getMessage());
            throw excep;
        }   
    }
}