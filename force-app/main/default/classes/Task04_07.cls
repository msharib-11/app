//Create Batch class to create 5 new Opportunities daily

global class Task04_07 implements database.Batchable<sobject>{
    global list<opportunity> start(database.BatchableContext x){
        List <opportunity> opList1 = new List <opportunity>();
        return opList1;
    }
    global void execute(database.BatchableContext x, List<opportunity> opList1){
        try {
            for(integer i=1; i<=5; i++){
                opportunity op = new opportunity();
                op.Name = 'Batch op'+i;
                op.StageName = 'closed loss';
                op.CloseDate = date.today();
                opList1.add(op);
            }
            insert opList1;
        }
        catch(DMLexception e){
            system.debug(e.getMessage());
        }
    }
    global void finish(database.BatchableContext b){
        
    }
}