// Create a Script to find out all the users in the systems who are having more than 20 Leads 
// allocated[Owner] to them in month of Dec 2017 

public class Task10_05 {
    public static void userLeads(){
     	/*
        List <Lead> Llist = new List <Lead>();
        for(integer i=1; i<=21; i++){
            Lead ld = new Lead();
            ld.LastName = 'lead info '+i;
            ld.Company = 'infosys';
            ld.Status = 'open - connected';
            Llist.add(ld);
        }
        insert Llist; */
        
        date date1 = date.newInstance(2023, 03, 01);
        date date2 = date.newInstance(2023, 03, 30);
        List<AggregateResult> agr = [select count(id), owner.name from lead where owner.name!=null and CreatedDate > :date1 and CreatedDate < :date2 group by owner.name having count(id)>=20 ];
        system.debug(agr);
    }
}