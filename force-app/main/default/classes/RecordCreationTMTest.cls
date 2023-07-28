@isTest
public class RecordCreationTMTest {
    @isTest
    public static void getFieldsTest(){
        List<string> fieldName = new List<string>();
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get('Contact');
        Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
        List<Schema.FieldSetMember> fieldSetMembers = objectDescribe.fieldSets.getMap().get('Member_Details_Field_Set_TM').getFields();
        for (Schema.FieldSetMember field : fieldSetMembers) {
            fieldName.add(field.getFieldPath());
        }
        list<string>gotFields=RecordCreationTM.getFields('Contact','Member_Details_Field_Set_TM'); 
        assert.areEqual(fieldName, gotFields, 'Checking if expected and actual fields are equal');
        
    }
    @isTest
    public static void checkWrongFieldsTest(){
        List<string> fieldName = new List<string>();
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get('Contact');
        Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
        List<Schema.FieldSetMember> fieldSetMembers = objectDescribe.fieldSets.getMap().get('Member_Details_Field_Set_TM').getFields();
        for (Schema.FieldSetMember field : fieldSetMembers) {
            fieldName.add(field.getFieldPath());
        }
        try{
            list<string>gotFields=RecordCreationTM.getFields('Contact','Member_Field_Set');
            assert.areEqual('true', 'false', 'Failed because method should not reach to this assert');
        }
        catch(Exception e){
            assert.areEqual('Attempt to de-reference a null object', e.getMessage(), 'Error Message is not expected');
        }
	}
}