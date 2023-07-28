public class ProfessorCount {
    public static void func(List<st_course__c> cList){
        List <st_course__c> cList1 = [select Id From st_course__c where st_professor__c =: cList[0].st_professor__c];
        if(cList1.size() >= 4){
            cList[0].addError('Not more than 4 Professor');
        }
    }
}