/**
* @description       : 
* @author            : Kumar Pratyush Srivastava
* @group             : 
* @last modified on  : 07-21-2023
* @last modified by  : Kumar Pratyush Srivastava
**/
@isTest
private class TestGetMemberDetailWithProjects {
        @testsetup static void createdDummyDataForTestClass(){
            
            List<Contact> testMembers = new List<Contact>();
            //creating contacts
            for (Integer i = 0; i < 3; i++) {
                Contact member = new Contact(FirstName = 'Test' + i,LastName = 'Member' + i,
                    CA_ID__c = 'CAID' + i,
                    Expertise__c = 'AURA',
                    Profile__c = 'Developer',
                    Resume_Experience__c = 2
                );
                testMembers.add(member);
            }
            insert testMembers;
            
            //creating a project record
            Project__c project = new Project__c(
                Name = 'Test Project',
                PC_PM_Name__c = testMembers[1].id,
                Type__c = 'Dedicated'
            );
            insert project;
    
            //list storing new member detail 
            List<Member_Details__c> testMemberDetails = new List<Member_Details__c>();
            for (Integer i = 0; i < 6; i++) {
                Member_Details__c memberDetail = new Member_Details__c(
                    Member__c = testMembers[i/2].Id,
                    Project__c = project.Id,
                    Real_used_hours__c = 10,
                    Billing_Hours__c = 15
                );
                testMemberDetails.add(memberDetail);
            }
            insert testMemberDetails;        
        }
    
        @isTest
        static void testGetMemberDetails() {
        
           List<Contact> fetchingTestSetupContactRecords = [Select id from Contact];
            List<String> memberIds = new List<String>();
            for (Contact member : fetchingTestSetupContactRecords) {
                memberIds.add(member.Id);
            }
            
            Test.startTest();
            String result = GetMemberDetailWithProjects.getMemberDetails(memberIds);
            Test.stopTest();
            
            List<GetMemberDetailWithProjects.DataWrapper> memberDetailWithProjectDetails =
                (List<GetMemberDetailWithProjects.DataWrapper>)JSON.deserialize(result, List<GetMemberDetailWithProjects.DataWrapper>.class);
    
            System.assertEquals(3, memberDetailWithProjectDetails.size(), 'assertion to check size of list');
            System.assertNotEquals(null,memberDetailWithProjectDetails[0].memberDetail,'assertion to check member detail');
            System.assertNotEquals(null, memberDetailWithProjectDetails[0].memberDetailWithProject,'assertion to check member detail with project');
            System.assert(memberDetailWithProjectDetails.size() > 0,'assertion to check list size');
            System.assertNotEquals(null,memberDetailWithProjectDetails[0].totalRealHours,'assertion to check totalreal hours');
            System.assertNotEquals(null, memberDetailWithProjectDetails[0].totalBillingHours,'assertion to check totalBillingHours');
        }
    
        @isTest
        static void testGetMemberDetailsException() {
            
            Test.startTest();
            String memberIdJson = GetMemberDetailWithProjects.getMemberDetails(null);
            Test.stopTest();
          
            System.assertEquals(' ', memberIdJson, 'checking length of the string');
            System.assert(0 < memberIdJson.length(), 'checking the length comparison');
            System.assertNotEquals(0, memberIdJson.length(), 'comparison of length');
        } 
}