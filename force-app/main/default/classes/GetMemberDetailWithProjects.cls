/**
* @description       : 
* @author            : Aditya Kumar Yadav
* @group             : 
* @last modified on  : 07-20-2023
* @last modified by  : Aditya Kumar Yadav
**/
public without sharing class GetMemberDetailWithProjects {
    @AuraEnabled
    public static String getMemberDetails(list<string> memberId){
        try {
            list<Contact> memberList=[Select CA_ID__c,Name,Expertise__c,Manager__r.Name,PC_PM__r.Name,TL_Lead__r.Name,Profile__c,Resume_Experience__c,
                                      (Select Name,Member__c,Project__c, Project__r.PC_PM_Name__r.Name , Project__r.Name,Real_used_hours__c,Billing_Hours__c
                                       from Member_Details__r)from contact where Id in :memberId];

            list<DataWrapper> memberDetailWithProjectDetails=new list<DataWrapper>();// Creating list instance of wrapper class for multiple members.

            for(Contact memberIterator:memberList)
            {
                DataWrapper eachMemberDetail=new DataWrapper();// creating instance of Wrapper class for each memeber
                eachMemberDetail.memberDetail=memberIterator;
                memberIterator.Resume_Experience__c=memberIterator.Resume_Experience__c!=null?memberIterator.Resume_Experience__c:0; //Null check for Resume_Experience__c field
                Decimal billingHours=0;
                Decimal realHours=0;
                Map<Id,Member_Details__c> projectIdWithDetail=new Map<Id,Member_Details__c>();
                for(Member_Details__c memberDetailIterator:memberIterator.Member_Details__r) //Loop on child records to add total and billing hours for each project of user
                {
                    billingHours+=memberDetailIterator.Billing_Hours__c!=null?memberDetailIterator.Billing_Hours__c:0; //providing default value if no value is provided
                    realHours+=memberDetailIterator.Real_used_hours__c!=null?memberDetailIterator.Real_used_hours__c:0;

                    if(projectIdWithDetail.containsKey(memberDetailIterator.Project__c)) // checking if user has already worked on same project on different months
                    {
                        Member_Details__c tempVar=projectIdWithDetail.get(memberDetailIterator.Project__c);
                        tempVar.Real_used_hours__c+=memberDetailIterator.Real_used_hours__c!=null?memberDetailIterator.Real_used_hours__c:0;
                        tempVar.Billing_Hours__c+=memberDetailIterator.Billing_Hours__c!=null?memberDetailIterator.Billing_Hours__c:0;
                        projectIdWithDetail.put(memberDetailIterator.Project__c,tempVar);
                    }

                    else
                    {
                        projectIdWithDetail.put(memberDetailIterator.Project__c,memberDetailIterator);
                    }

                }

                eachMemberDetail.memberDetailWithProject=projectIdWithDetail.values();// Storing all the project detail in wrapper class
                eachMemberDetail.totalRealHours=realHours; // storing total hour for a member combining all projects real hour
                eachMemberDetail.totalBillingHours=billingHours; // storing total billing hour for a member combining all projects billing hour
                memberDetailWithProjectDetails.add(eachMemberDetail); // adding instance for each member to list of wrapper class
            }

            return JSON.serialize(memberDetailWithProjectDetails);
            
        } catch (Exception e) {
            System.debug('exception occured' + e.getCause() + 'exception line number '+ e.getLineNumber());
            return ' ';
        }
    }
    //This is a wrapper class used to store member detail with project detail and there real and billing hour
    public class DataWrapper{
        public contact memberDetail;
        public list<Member_Details__c> memberDetailWithProject;
        Public Decimal totalRealHours,totalBillingHours;
    }
}