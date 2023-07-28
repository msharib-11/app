// Create 10 Contacts with different Account(LookUp) values(Relationship with no same 2 accounts) in them.

public class cre_acc_cont {
    public static void creAccount(){
        List <Account> accList = new List <Account>();
        for(integer i=1; i<=10; i++){
            Account acc = new Account();
            acc.Name = 'sbi-user '+i;
            acc.AccountNumber = 'user01'+i;
            acc.AccountSource = 'web';
            accList.add(acc);
        }
        if(!accList.isEmpty()){
            insert accList;
        }
        
        List <Contact> conList = new List <Contact>();
        integer j = 1;
        for(Account ac: accList){
            Contact con = new Contact();
            con.AccountId = ac.Id;
            con.LastName = 'con-name '+j;
            j++;
            conList.add(con);
        }
        if(!conList.isEmpty()){
            insert conList;
        }
    }
}