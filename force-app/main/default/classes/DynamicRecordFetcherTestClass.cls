/**
* @description       : 
* @author            : Kumar Pratyush Srivastava
* @group             : 
* @last modified on  : 07-21-2023
* @last modified by  : Kumar Pratyush Srivastava
**/
@istest
private class DynamicRecordFetcherTestClass {
    
    @testsetup static void dummyDataForTestClass(){
         //contact is the apiName of Member object
         Contact singleContactRecord = new Contact();
         singleContactRecord.LastName = 'TestMember';
         singleContactRecord.CA_ID__c    ='CA-123-018';
         insert singleContactRecord;
        
        //creating member records
        List<Contact> listOfRecords = new List<Contact>();
        for(Integer i=0; i<10; i++){
            Contact contacts = new Contact();
            contacts.LastName = 'TestMember' + i;
            contacts.CA_ID__c = 'CA-123-018' +i;
            contacts.Manager__c = singleContactRecord.Id;
            contacts.Resume_Experience__c = i;
            listOfRecords.add(contacts);
        }
        insert listOfRecords;
        
        Account account = new Account(Name = 'Test Account');
        insert account;
        
    }
    @istest static void recordFetcherTestMethod(){
	 Schema.DescribeSObjectResult objectName = Contact.sObjectType.getDescribe();
        List<String> apiNames = new List<String>();
        for(String apiName : objectName.fields.getMap().keySet()){
            apiNames.add(apiName);
        }
        System.Test.startTest();
        List<Contact> contactRecordList = DynamicRecordFetcher.fetchRecords('Contact', apiNames);
        System.Test.stopTest();
        System.assertNotEquals(0, contactRecordList.size(), 'checking records fetched properly');
    }
    
     @isTest static void testFetchRecordsCatch() {
        String objectName = 'Account';
        List<String> fieldsList = new List<String>{ 'Id', 'Name', 'NonExistentField__c' };

        Test.startTest();
        List<SObject> records = DynamicRecordFetcher.fetchRecords(objectName, fieldsList);
        Test.stopTest();
        System.assertEquals(0, records.size(), 'Expected no records due to exception');
    }
}