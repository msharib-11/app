public with sharing class lwcQuestion4 {
    @AuraEnabled(cacheable=true)
    public static List<Account> methodName(){
        try {
            return [select Name, Type, Rating From Account];
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getacc(string key){
        try {
            string sKey = '%'+ key + '%';
            List <Account> acclist = [select Name, Type, Rating From Account where name like :sKey];
            if(acclist.isEmpty()){
                System.debug('err');
            }
            return acclist;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}