// Create several Accounts and Opportunites and products. Write a Script to get all the 
// Accounts having more than 2 Opportunites with Closed Won. 


public class Task5_05 {
       public static void method(){
        List <Account> accList = [select name, (select name, stageName, closeDate from opportunities where stageName = 'closed won') from Account];
        List <string> st = new List <string>();
        for(Account ac: accList){
            if(ac.opportunities.size() >= 2){
                st.add(ac.name);
            }
        }
    	system.debug(st);
	}
}





/*
public static void method(){
    List <Account> accList = [select name, (select name, stageName, closeDate from opportunity where stageName = 'closed won') from Account];
    List <string> st = new List <string>();
    for(Account ac: accList){
        if(ac.opportunity.size() >= 2){
            st.add(acc.name);
        }
    }
    system.debug(st);
} public static void displayAcc(){
        list<Opportunity> opp=[Select id, Account.Name,StageName From Opportunity where Account.Name!=null and StageName='Closed Won'];
        list<String> accid=new list<String>();
        for(Opportunity op:opp){
            accid.add(op.Account.Name);
        }
        Map<String,Integer> m1 = new Map<String,Integer>();
        for(String acc:accid){
             if(m1.containsKey(acc)){
                 m1.put(acc,m1.get(acc)+1);
             }
             else{
                  m1.put(acc,1);
             }
        }
        for(String key: m1.keySet()){
            if(m1.get(key)>=2){
                System.debug(key);
            }     
        }     
    }

*/