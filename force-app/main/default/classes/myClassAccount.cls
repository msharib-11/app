public with sharing class myClassAccount {
    //@AuraEnabled (cacheable = true)
    public static void getAcc(string text){
        try {
            string str = '%'+text+'%';
            List <Account> accList = [select Id, Name, Website from Account where name like :str];
            System.debug(accList);
            //return accList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}