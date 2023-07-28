public class handlerclass06_06 {
    public static void oppo(List <opportunity> oppList){
        try{
            for(opportunity op: oppList){
                if(op.stageName == 'Closed won' || op.stageName == 'Closed lost'){
                    if(op.TotalOpportunityQuantity == NULL){
                        op.adderror('No opportunity line item');
                    }
                }
            }
        }
        catch(exception e){
            system.debug(e.getMessage());
        }
    }
}