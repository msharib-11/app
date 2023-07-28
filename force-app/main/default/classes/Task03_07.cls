public class Task03_07 {
    public static void del(){
        cronTrigger jobRecord = [select id, CronJobDetail.Name From CronTrigger where CronJobDetail.Name Like 'schedule job'];
        system.abortJob(jobRecord.id);
    }
}