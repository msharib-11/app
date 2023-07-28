public class task09_07 {
    public static void del(){
        List <cronTrigger> job12 = [select id, CronJobDetail.name from cronTrigger where CronJobDetail.name like 'batchable%'];
        for(cronTrigger ct: job12){
            system.abortJob(ct.id);
        }
    }
}