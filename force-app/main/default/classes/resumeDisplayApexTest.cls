/*
*********************************************************
Apex Class Name    : resumeDisplayApexTest
@description       : This is class is used for test the resumeDisplayApex class.
*********************************************************
*/
@isTest
public class resumeDisplayApexTest {
/*
*********************************************************
@Method Name    : create
@description    : Creates test data for resumeDisplayApexTest class
@param          :
@return         : 
********************************************************
*/
    @testSetup
    public static void create() {
        Contact con=new Contact(FirstName='Sample', LastName='Test Contact', CA_Id__c='1');
        insert con;
        Resume__c res=new Resume__c(Member__c=con.Id, Experience__c=20, Resume_Link__c='www.resume.com', Expertise_Key__c='AURA');
        insert res;
    }
/*
*********************************************************
@Method Name    : fetchResumeTest
@description    : Tests positive cases for fetchResume method
@param          :
@return         : 
********************************************************
*/
	@isTest
    public static void fetchResumeTest() {
        System.Test.startTest();
        List<Resume__c> resultList=resumeDisplayApex.fetchResume('Resume__c', 'sfass_Resume_Field_Set');
        System.Test.stopTest();
        System.assertEquals(20, resultList[0].Experience__c, 'Successful');
    }
/*
*********************************************************
@Method Name    : fetchResumeTestFail
@description    : Tests negative cases for fetchResume method
@param          :
@return         : 
********************************************************
*/
    @isTest
    public static void fetchResumeTestFail() {
        System.Test.startTest();
        resumeDisplayApex.fetchResume('Resume__c', 'sfass_Resume_Field_Se');
        System.Test.stopTest();
    }
/*
*********************************************************
@Method Name    : fetchFieldsTest
@description    : Tests positive cases for fetchFields method
@param          :
@return         : 
********************************************************
*/
    @isTest
    public static void fetchFieldsTest() {
        System.Test.startTest();
       	List<Map<String, String>> resultList=resumeDisplayApex.fetchFields('Resume__c', 'sfass_Resume_Field_Set');
        System.Test.stopTest();
        System.assertEquals(5, resultList.size(), 'Successful');
    }
/*
*********************************************************
@Method Name    : fetchFieldsTestFail
@description    : Tests negative cases for fetchFields method
@param          :
@return         : 
********************************************************
*/
    @isTest
    public static void fetchFieldsTestFail() {
        System.Test.startTest();
       	resumeDisplayApex.fetchFields('Resume__c', 'sfass_Resume_Field_Se');
        System.Test.stopTest();
    }
}