/*
       * @description       : This class is used for testing apex class methods.
       * @author            : Ayush Raj
       * @group             : Group A => MayankGupta, Ayush Raj, Kavya Srivastava, Prerna Jhingran, Rohit Kumar.
       * @last modified on  : 
       * @last modified by  : Ayush Raj
*/
@istest
public class ProjectDatatableHelperTest {
    @istest public static void getFieldsAndRecordsTest(){
        
        TestDataFactory.createMember();
        List<project__c> projectRecordList = TestDataFactory.createProject();
        List<member_details__c> memberDetailsRecordList = TestDataFactory.createMemberDetail();
        List<Schema.FieldSetMember> projectFieldSetList = TestDataFactory.getProjectFieldSet();
        List<Schema.FieldSetMember> memberDetailsFieldSetList = TestDataFactory.getMemberDetailsFieldSet();
        
        Map<String, String> testMap = new Map<String, String>();
        testMap.put('FIELD_LIST', JSON.serialize(projectFieldSetList));
        testMap.put('RECORD_LIST', JSON.serialize(projectRecordList));
		testMap.put('MEMBER_FIELD_LIST', JSON.serialize(memberDetailsFieldSetList));
		testMap.put('MEMBER_RECORD_LIST', JSON.serialize(memberDetailsRecordList));
              
        string str = JSON.serialize(testMap);
        map<string, object> newMap= (map<string, object>) JSON.deserializeUntyped(str);
        test.startTest();
        string returnedString = ProjectDatatableHelper.getFieldsAndRecords('Project__c', 'ProjectRelatedListFS', 'Name' , null, 'Member_Details__c', 'MemberDetailListFS');
        test.stopTest();
        map<string, object> newReturnedMap= (map<string, object>) JSON.deserializeUntyped(returnedString);
        Assert.areEqual(newMap.get('FIELD_LIST'), newReturnedMap.get('FIELD_LIST'));
    }
    @istest public static void getFieldsAndRecordsForCatchTest(){
        
        TestDataFactory.createMember();
        List<project__c> projectRecordList = TestDataFactory.createProject();
        List<member_details__c> memberDetailsRecordList = TestDataFactory.createMemberDetail();
        List<Schema.FieldSetMember> projectFieldSetList = TestDataFactory.getProjectFieldSet();
        List<Schema.FieldSetMember> memberDetailsFieldSetList = TestDataFactory.getMemberDetailsFieldSet();
        
        Map<String, String> testMap = new Map<String, String>();
        testMap.put('FIELD_LIST', JSON.serialize(projectFieldSetList));
        testMap.put('RECORD_LIST', JSON.serialize(projectRecordList));
		testMap.put('MEMBER_FIELD_LIST', JSON.serialize(memberDetailsFieldSetList));
		testMap.put('MEMBER_RECORD_LIST', JSON.serialize(memberDetailsRecordList));
              
        string str = JSON.serialize(testMap);
        map<string, object> newMap= (map<string, object>) JSON.deserializeUntyped(str);
        test.startTest();
        string returnedString = ProjectDatatableHelper.getFieldsAndRecords('Project_c', 'ProjectRelatedListFS', 'Name' , null, 'Member_Details__c', 'MemberDetailListFS');
        test.stopTest();
        Assert.areEqual(null, returnedString);
    }
    @istest public static void getFieldsAndRecordsTestForNullTest(){
        test.startTest();
        string returnedMap = ProjectDatatableHelper.getFieldsAndRecords('', 'ProjectRelatedListFS', 'Name' , null, 'Member_Details__c', 'MemberDetailListFS');
        test.stopTest();
        Assert.areEqual(null, returnedMap);
    }
    
    @istest public static void sendXmlEmailForMembersTest(){        
        List<Schema.FieldSetMember> projectFieldSetList = TestDataFactory.getProjectFieldSet();
        List<Object> demoProjectData = new List<Object>{
            new Map<object, Object>{'Name' => 'Project1', 'Type__c' => 'TNM'},
            new Map<object, Object>{'Name' => 'Project2', 'Type__c' => 'TNM'}
        };
        map<String, String> expectedResult = new map<String, String> ();
        expectedResult.put('SUCCESS', 'The email was sent successfully.');
        test.startTest();
		map<String, String> actualResult = ProjectDatatableHelper.SendXmlEmailForMembers('ayush.raj@cloudanalogy.com',JSON.serialize(projectFieldSetList),demoProjectData);
        test.stopTest();
        Assert.areEqual(expectedResult, actualResult);
    }
    @istest public static void sendXmlEmailForMembersForCatchTest(){        
        List<Schema.FieldSetMember> projectFieldSetList = TestDataFactory.getProjectFieldSet();
        List<Object> demoProjectData = new List<Object>{
            new Map<object, Object>{'Nme' => 'Project1', 'Type_c' => 'TNM'},
            new Map<object, Object>{'Nme' => 'Project2', 'Typ__c' => 'TNM'}
        };
        map<String, String> expectedResult = new map<String, String> ();
        expectedResult.put('ERROR', 'The email failed to send');
        test.startTest();
		map<String, String> actualResult = ProjectDatatableHelper.SendXmlEmailForMembers('ayush.raj@cloudanom',JSON.serialize(projectFieldSetList),demoProjectData);
        test.stopTest();
        Assert.areEqual(expectedResult, actualResult);
    }
    @istest public static void sendXmlEmailTest(){        
        List<Object> demoProjectData = new List<Object>{
            new Map<object, Object>{'Name' => 'Project1', 'Id'=>'a025j00000PrsWQAAZ', 'Type__c' => 'TNM'},
            new Map<object, Object>{'Name' => 'Project2', 'Id'=>'a025j00000PrsWRAAZ', 'Type__c' => 'TNM'}
        };
        string memberDetails  = '{"a025j00000PrsWQAAZ":[\"Demo Member6\",\"Demo Member5\"],"a025j00000PrsWRAAZ":[\"Demo Member6\"]}';
        string projectFieldList ='[{"label":"Project Name","fieldName":"URLField","sortable":true},{"label":"PC/PM Name","fieldName":"PCPM_Name"},{"label":"TL Manager","fieldName":"Manager_Name"},{"label":"Description","fieldName":"Description__c"},{"label":"Client Name","fieldName":"Client_Name__c"},{"label":"Total Hours","fieldName":"Total_Hours__c"},{"label":"Real Used Hours","fieldName":"Real_Used_Hours__c"},{"label":"Type","fieldName":"Type__c"},{"type":"action","typeAttributes":{"rowActions":[{"label":"View","name":"View"},{"label":"Edit","name":"Edit"}],"menuAlignment":"right"}}]';
        map<String, String> expectedResult = new map<String, String> ();
        expectedResult.put('SUCCESS', 'The email was sent successfully.');
        test.startTest();
		map<String, String> actualResult = ProjectDatatableHelper.SendXmlEmail('ayush.raj@cloudanalogy.com',projectFieldList,demoProjectData,memberDetails);
        test.stopTest();
        Assert.areEqual(expectedResult, actualResult);
    }
    @istest public static void sendXmlEmailForCatchTest(){        
        List<Object> demoProjectData = new List<Object>{
            new Map<object, Object>{'Nme' => 'Project1', 'I'=>'a025j00000PrsWQAAZ', 'Type__c' => 'TNM'},
            new Map<object, Object>{'Nme' => 'Project2', 'I'=>'a025j00000PrsWRAAZ', 'Type__c' => 'TNM'}
        };
        string memberDetails  = '{"a025j00000PrsWQAAZ":[\"Demo Member6\",\"Demo Member5\"],"a025j00000PrsWRAAZ":[\"Demo Member6\"]}';
        string projectFieldList ='[{"lael":"Project Name","fieldName":"URLield","sortable":true},{"label":"PC/PM Name","fieldName":"PCPM_Name"},{"label":"TL Manager","fieldName":"Manager_Name"},{"label":"Description","fieldName":"Description__c"},{"label":"Client Name","fieldName":"Client_Name__c"},{"label":"Total Hours","fieldName":"Total_Hours__c"},{"label":"Real Used Hours","fieldName":"Real_Used_Hours__c"},{"label":"Type","fieldName":"Type__c"},{"type":"action","typeAttributes":{"rowActions":[{"label":"View","name":"View"},{"label":"Edit","name":"Edit"}],"menuAlignment":"right"}}]';
        map<String, String> expectedResult = new map<String, String> ();
        expectedResult.put('ERROR', 'The email failed to send');
        test.startTest();
		map<String, String> actualResult = ProjectDatatableHelper.SendXmlEmail('ayush.rajcloudanalogycom',projectFieldList,demoProjectData,memberDetails);
        test.stopTest();
        Assert.areEqual(expectedResult, actualResult);
    }
    @istest public static void sendXmlEmailTestForNoURL(){        
        List<Object> demoProjectData = new List<Object>{
            new Map<object, Object>{'Name' => 'Project1', 'Type__c' => 'TNM'},
            new Map<object, Object>{'Name' => 'Project2', 'Type__c' => 'TNM'}
        };
        string memberDetails  = '{"a025j00000PrsWQAAZ":[\"Demo Member6\",\"Demo Member5\"],"a025j00000PrsWRAAZ":[\"Demo Member6\"]}';
        string projectFieldList = '[{"label":"Project Name","fieldName":"","fixedWidth":150,"type":"url","typeAttributes":{"label":{"fieldName":"Name"},"target":"_blank"},"sortable":true}]';
        map<String, String> expectedResult = new map<String, String> ();
        expectedResult.put('SUCCESS', 'The email was sent successfully.');
        test.startTest();
		map<String, String> actualResult = ProjectDatatableHelper.SendXmlEmail('ayush.raj@cloudanalogy.com',projectFieldList,demoProjectData,memberDetails);
        test.stopTest();
        Assert.areEqual(ActualResult, expectedResult);
    }
}