// Delete all contacts belonging to Accounts Name FIELD having 'A' in them.

public class Task15 {
    Public static void del(){
        try {
            List <Contact> con = [Select name from Contact where Account.name like '%a%' limit 4999];
            Database.delete(con, false);
            }
        catch(exception e){
            system.debug(e.getMessage());
        }
    }
}