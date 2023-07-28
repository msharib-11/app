// Write a Batch class to delete accounts created within 10 days.
global class Task01_07 implements database.Batchable<sobject>{
    global list<Account> start(database.BatchableContext x){
        date d1 = date.today();
        date d2 = date.today().addDays(-10);
        List <Account> acList1 = [select id, name from Account where createdDate > :d2 and createdDate < :d1];
        return acList1;
    }
    global void execute(database.BatchableContext x, List<Account> acList1){
        try {
            Database.delete(acList1, false);
        }
        catch(DMLexception e){
            system.debug(e.getMessage());
        }
    }
    global void finish(database.BatchableContext b){
        
    }
}