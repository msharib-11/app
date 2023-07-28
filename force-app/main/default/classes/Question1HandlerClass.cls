public class Question1HandlerClass {
    public static void answer1Handler( List<Account> accList)
    {
        try{
             List<Contact> conlist = new List<Contact>();
    for(Account acc : accList){
        if(acc.NumberOfEmployees != null){
            for(Integer i=0; i< acc.NumberOfEmployees;i++){
                contact con = new contact();
                con.AccountId = acc.Id;
                con.LastName = 'Employee Num.  '+i;
                conlist.add(con);
            }
        }
    }
    insert conlist;
        }
        catch(Exception e)
        {
            system.debug('Error Messege ===> '+e.getMessage()+''+'Line Number====>'+e.getLineNumber());
        }
    }
}