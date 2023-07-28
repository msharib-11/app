@isTest
public class TestDataFactory {
    static Id globalMemberId ;
    static Id globalProjectId ;
    
    public static contact createMember(){
        contact member = new contact();
        member.FirstName = 'test1';
        member.LastName = 'Member1';
        member.CA_ID__c = '100019291';
        insert member; 
        globalMemberId = member.Id;
        
        return member;
    }
    
    public static List<project__c> createProject(){
        project__c project = new project__c();
        project.Name = 'TestProject';
        project.PC_PM_Name__c = globalMemberId;
        insert project;
        globalProjectId = project.Id;
        List<project__c> projectRecordList = new list<project__c>();
        projectRecordList.add(project);
        return projectRecordList;
    }
    public static List<member_details__c> createMemberDetail(){
        Member_details__c memberDetail = new Member_details__c();
        memberDetail.Member__c = globalMemberId;
        memberDetail.Project__c = globalProjectId;
        insert memberDetail;
        List<member_details__c> memberDetailsRecordList = new List<member_details__c>();
        memberDetailsRecordList.add(memberDetail);
        return memberDetailsRecordList;
    }
    public static List<Schema.FieldSetMember> getProjectFieldSet(){
        SObject sObj = (SObject)(Type.forName('Schema.'+ 'Project__c').newInstance());
        List<Schema.FieldSetMember> projectFieldSetList = sObj.getSObjectType().getDescribe().fieldSets.getMap().get('ProjectRelatedListFS').getFields();
        return projectFieldSetList;
    }
    public static List<Schema.FieldSetMember> getMemberDetailsFieldSet(){
        SObject sObj = (SObject)(Type.forName('Schema.'+ 'Project__c').newInstance());
        List<Schema.FieldSetMember> memberDetailsFieldSetList = sObj.getSObjectType().getDescribe().fieldSets.getMap().get('ProjectRelatedListFS').getFields();
        return memberDetailsFieldSetList;
    }
}