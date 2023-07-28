global class Task04_1_07 implements schedulable{
    global void execute(system.SchedulableContext s){
		Task04_07 obj = new Task04_07();
		id batchId = database.executeBatch(obj);        
    }
}