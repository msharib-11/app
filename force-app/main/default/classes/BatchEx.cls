global class BatchEx implements database.Batchable<sobject>{
    global list<Lead> start(database.BatchableContext x){
        list <Lead> leList = [select id, rating, leadSource from Lead];
        return leList;
    }
    global void execute(database.BatchableContext x, List<Lead> leList){
        for(lead l: leList){
            if(l.leadSource == 'web'){
                l.rating = 'warm';
            }
        }
        update leList;
    }
    global void finish(database.BatchableContext b){
        
    }
}