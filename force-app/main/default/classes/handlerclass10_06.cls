public class handlerclass10_06 {
    public static void oppline(List <opportunity> oppList){
        try{
            List <opportunity> oList = [select id, (select id from opportunityLineItems) from opportunity where id in :oppList];
            for(opportunity op: oList){
                if(op.opportunityLineItems.size() >2){
                    op.adderror('Do not allow to add more product');
                }
            }
        }
        catch(exception e){
            system.debug(e.getMessage());
        }
    }
}