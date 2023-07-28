public class handlerclass06_1 {
    public static void acc(List <Account> acclist){
        try{
            List <contact> conList = new List <contact>();
            for(Account ac: accList){
				for(integer i=1; i<=ac.NumberOfEmployees; i++){
                	contact con = new contact();
                    con.AccountId = ac.Id;
                    con.LastName = 'con '+i;
                    conList.add(con);
                }
        	}
            insert conList;
        }
        catch(DMLexception e){
            system.debug(e.getMessage());
        }
    }
}