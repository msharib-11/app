global class Task11_1_07 implements schedulable{
    global void execute(system.SchedulableContext sc){
        Task11_07 ob = new Task11_07();
        id batchId = database.executeBatch(ob);
    }
}