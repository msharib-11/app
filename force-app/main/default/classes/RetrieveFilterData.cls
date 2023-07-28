public class RetrieveFilterData {
    public static void main(String expertise, String profile, Integer experience){
        if(experience == null){
            experience = 0; 
        }
        if(expertise == null){
            expertise = 'Salesforce Admin\',\'AURA\',\'LWC\',\'Hubspot\',\'Zoho';
        }
        system.debug('expertise>>>>>>>'+expertise);
        String query1 = 'Select Name, Member__r.Profile__c, Resume_Link__c, Experience__c, Expertise_Key__c from Resume__c where Expertise_Key__c INCLUDES (\'AURA\') AND Member__r.Profile__c LIKE \'%'+profile+'%\' AND Experience__c >='+experience;
      
        System.debug('query1>>>>>>>>>>.'+query1);
        system.debug('executed query>>>>>>>>>.'+Database.query(query1));
    }
}