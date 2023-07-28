public class Task06_07 {
    public static void del(){
		cronTrigger job1 = [select id, CronJobDetail.Name From CronTrigger where CronJobDetail.Name Like 'schedulable%'];
        system.abortJob(job1.id);
    }
}