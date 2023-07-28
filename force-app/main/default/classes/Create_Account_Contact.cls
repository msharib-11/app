public class Create_Account_Contact {
    public static void createAccCon(){
        Account acc = new Account();
        acc.Name = 'Cloud Analogy';
        acc.Website = 'www.ac.com';
        insert acc;
        
        List <contact> conList = new List<contact>();
        for(integer i=1; i<=2; i++){
            contact con = new contact();
            con.AccountId = acc.Id;
            con.LastName = 'kumar'+i;
            con.FirstName = 'Aman'+i;
            conList.add(con);
        }
        if(!conlist.isEmpty())
            insert conList;
    }
}