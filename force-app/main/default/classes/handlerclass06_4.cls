public class handlerclass06_4 {
    public static void con(List <contact> conList){
        try{
            List <Account> accList = [select id, name from Account];
            for(contact con: conList){
                for(Account ac: accList){
                    if(con.Accountid == ac.id){
                        ac.name = ac.name+con.lastname;
                    }
                }
            }
            update accList;
        }
        catch(exception e){
            system.debug(e.getMessage());
        }
    }
}