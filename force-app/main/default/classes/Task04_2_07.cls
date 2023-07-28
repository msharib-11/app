public class Task04_2_07 {
    public static void del(){
        cronTrigger jobRecord = [select id, CronJobDetail.Name From CronTrigger where CronJobDetail.Name Like 'schedule%'];
        system.abortJob(jobRecord.id);
    }
}