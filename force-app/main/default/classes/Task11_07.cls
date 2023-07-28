// Create a batch Class which should run every day 00:00 and fetch all the Leads created yesteday 
// not having a Phone number.

global class Task11_07 implements database.Batchable<sobject>{
    global List <Lead> start(database.BatchableContext x){
        date d1 = date.today().addDays(-1);
        List <Lead> lList = [select id, name from Lead where createdDate =last_n_days:1 and phone = NULL];
        return lList;
    }
    global void execute(database.BatchableContext x, List<Lead> lList){
        try {
            for(Lead l: lList){
                system.debug(l);
            }
        }
        catch(DMLexception e){
            
        }
    }
    global void finish(database.BatchableContext b){
        
    }
}