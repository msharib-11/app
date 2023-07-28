public class handlerclass8_06 {
    public static void camp(List <campaign> campList){
        List <opportunity> oppList = new List <opportunity>();
        for(campaign cp: campList){
            if(cp.status == 'completed'){
            	opplist = [select id, stageName,TotalOpportunityQuantity from opportunity where campaignId = :cp.Id];
                for(opportunity op: opplist){
                    if(op.TotalOpportunityQuantity > 0){
                        op.stageName = 'closed won';
                    }
                    else{
                        op.stageName = 'closed lost';
                    }
                }
            }
        }
        update opplist;
    }
}