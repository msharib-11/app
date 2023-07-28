global class Task07_07 implements Database.Batchable<sobject>{
    global list<Account> start(database.BatchableContext x){
     List <Account> acList = [select id, name, count__c, (select id from contacts) from Account];
        return acList;
    }
    global void execute(Database.BatchableContext bc, List <Account> acList){
        
        for(Account ac: acList){
            ac.count__c = ac.contacts.size();
        }
        update acList;
    }
    global void finish(Database.BatchableContext bc){
        
    }
}