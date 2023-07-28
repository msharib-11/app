@isTest
public class Test10_05 {
	@TestSetup
    public static void func(){
		List <Lead> Llist = new List <Lead>();
        for(integer i=1; i<=21; i++){
            Lead ld = new Lead();
            ld.LastName = 'lead info '+i;
            ld.Company = 'infosys';
            ld.Status = 'open - connected';
            Llist.add(ld);
        }
        insert Llist;
        
    }
    @isTest
    public static void function(){
        test.startTest();
        Task10_05.userLeads();
        test.stopTest();
        
        date date1 = date.newInstance(2023, 03, 01);
        date date2 = date.newInstance(2023, 03, 30);
        List<AggregateResult> agr = [select count(id), ownerId ow from lead where owner.name!=null and CreatedDate > :date1 and CreatedDate < :date2 group by ownerId having count(id)>=20 ];
        user u = [select id, name from user where firstName = 'Mohd'];
        id i = (id)agr[0].get('ow');
        system.assertEquals(u.id, i, 'err');
    }
}