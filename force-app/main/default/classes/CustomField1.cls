public class CustomField1 {
    public static void Author(){
        List <Author__c> authorList = new List<Author__c>();
        for(integer i=1; i<=5; i++){
            Author__c auth = new Author__c();
            auth.Name = 'Mohd Sharib '+i;
            //auth.Phone_Number__c = 8984882323;
            authorList.add(auth);
        }
        if(!authorList.isEmpty()){
            insert authorList;
        }
    }
}