public class opportunity_1 {
    public static void createOpp(){
        try {
            List<Opportunity> oppList = new List<Opportunity>();
            for(integer i=1; i<=10; i++){
                Opportunity opp = new Opportunity();
                opp.StageName = 'Close won';
                opp.closeDate = Date.newInstance(2023, 02, i);
                opp.Name = 'Our_opp '+i;
                oppList.add(opp);
            }
            if(!oppList.isempty()){
                insert oppList;
            }
        }
        catch(Exception e) {
            system.debug('Error is ' + e.getMessage());
        }
    }
}