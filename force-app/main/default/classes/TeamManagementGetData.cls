public class TeamManagementGetData {
	@AuraEnabled(cacheable=false)
    public static List<string> getFields(String objectName, String fieldSetName){
        try {
            List<string> fieldName = new List<string>();
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
            throw new AuraHandledException(e.getMessage());
        }   
	}
}