// Write a Script to get all the Contacts having same email as any Salesforce User.Email

public class Task11 {
    public static string conUser(){
        List <user> ulist = [select email from user];
        set <string> mail = new set <string>();
        for(user e: ulist){
            mail.add(e.Email);
        }
        List <Contact> cList = [Select name, email from Contact where email = :mail];
        for(Contact c: cList){
            system.debug(c);
        }
        return cList[0].Email;
    }
}