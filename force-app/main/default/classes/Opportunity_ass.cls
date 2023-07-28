//Create 20 Opportunities with Closed Date, Stage and Opportunity Name.

public class Opportunity_ass {
    public static void creOpportunity(){
        List <Opportunity> oppList = new List <Opportunity>();
        for(integer i=1; i<=20; i++){
            Opportunity opp = new opportunity();
            opp.Name = 'New-Opp '+i;
            opp.CloseDate = Date.NewInstance(2023, 02, i);
            opp.StageName = 'closed won';
            oppList.add(opp);
        }
        insert oppList;
    }
}