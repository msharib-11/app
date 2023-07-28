public class Create_oppurtunities {
    public static void create_Opp() {
        List<Opportunity> oppList = new List<Opportunity>();
        for(integer i=1; i<=10; i++){
            Opportunity opp = new Opportunity();
            opp.Name = 'My opp '+i;
            opp.StageName = 'Qualification';
            opp.CloseDate = Date.newInstance(2023, 02, 17);
            oppList.add(opp);
        }
        if(!oppList.isEmpty()){
            insert oppList;
        }
    }
}