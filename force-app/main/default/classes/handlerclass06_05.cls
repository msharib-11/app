public class handlerclass06_05 {
    public static void cont(List <contact> conList){
        try{
            List <Account> accList = [select id, name from Account];
            for(contact con: conList){
                for(Account ac: accList){
                    if(con.Accountid == ac.id){
                        string str = con.LastName;
                        ac.name = ac.Name.replace(str, ' ');
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