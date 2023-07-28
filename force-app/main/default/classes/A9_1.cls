// Write an Apex script that queries all "Opportunity" records with related "Task" records, and groups 
// the tasks by "Subject" and calculates the count of tasks for each subject. The script should then update 
// the "Opportunity" record's custom fields for each subject, storing the corresponding count of tasks.

public class A9_1 {
    public static void func(){
        List<Opportunity> oppList = [SELECT id,(SELECT id, Subject FROM Tasks) FROM Opportunity];
        for(Opportunity op : oppList){
        Map<String, Integer> mp = new Map<String,Integer>{'call'=>0, 'Email'=>0, 'Send letter'=>0, 'Send Quote'=>0, 'others' => 0};
            for(Task t : op.Tasks){
                mp.put(t.Subject, mp.get(t.Subject) +1);
            }
            system.debug(mp);
        }
    }
}