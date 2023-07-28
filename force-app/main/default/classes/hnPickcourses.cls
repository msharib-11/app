public class hnPickcourses {
    public static void func(){
        //List<st_course__c> cList
        string str1='bcd';
        /*for(st_course__c sc: cList){
            str1 = sc.Name;
        }*/
        List<st_student__c> sList = [select Courses__c from st_student__c];
        for(st_student__c s: sList){
            s.Courses__c=str1;
        }
        update sList;
    }
}