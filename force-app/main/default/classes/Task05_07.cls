// Schedule the above class to run 4 times every day at after every 6 hours.

global class Task05_07 implements schedulable{
    global void execute(system.SchedulableContext sc){
        Task04_07 obj = new Task04_07();
        id batchId = database.executeBatch(obj);
    }
}