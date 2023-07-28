@isTest
public class GetMemberDetailWithProjectsTest {
    @isTest static void getMemberDetailsCheck(){
        contact memberRecord= TestDataFactory.createMember();
        list<String> memberId=new list<String>();
        memberId.add(String.valueOf(memberRecord.Id));
        List<project__c> projectRecords= TestDataFactory.createProject();
        List<member_details__c> memberDetailRecords=TestDataFactory.createMemberDetail();
        string memberDetailWithProjects=GetMemberDetailWithProjects.getMemberDetails(memberId);
        memberDetailWithProjects=memberDetailWithProjects.remove('(');
        memberDetailWithProjects=memberDetailWithProjects.remove(')');
        DataWrapper memberDetailWithProjectDetails=(DataWrapper)JSON.deserialize(memberDetailWithProjects,DataWrapper.class);
        system.debug(memberDetailWithProjectDetails.totalRealHours);
    }
        public class DataWrapper{
        public contact memberDetail;
        public list<Member_Details__c> memberDetailWithProject;
        Public Decimal totalRealHours;
        Public Decimal totalBillingHours;
    }
}