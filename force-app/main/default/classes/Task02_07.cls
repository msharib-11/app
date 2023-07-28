// Schedule the above class to run every day at 12:00 PM.
global class Task02_07 implements schedulable {
    global void execute(system.SchedulableContext s){
		Task01_07 ob = new Task01_07();
		id batchId = database.executeBatch(ob);        
    }
}