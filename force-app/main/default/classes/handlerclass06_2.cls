public class handlerclass06_2 {
    public static void opp(List <opportunity> oppList){
        try{
            for(opportunity op: oppList){
                if(op.closeDate < date.today()){
                    op.adderror('Please enter a future closed date');
                }
            }
        }
        catch(exception e){
            system.debug(e.getMessage());
        }
    }
}