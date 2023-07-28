// Write a program in Salesforce to create another System admin user in your dev org with your email. Register the user manually.

public class Task17 {
    public static void sysAdmin(){
        try {
            Profile proId = [select id from Profile where name = 'System Administrator' limit 1];
            User user1 = new User();
       		user1.LastName = 'newUser1';
        	user1.Alias = 'nuse1';
        	user1.Email = 'md.sharib@cloudanalogy.com';
        	user1.Username = 'msharib@cloudanalogy.com';
            user1.EmailEncodingKey = 'UTF-8';
            user1.ProfileId = proId.Id;
            user1.TimeZoneSidKey = 'GMT';
            user1.LanguageLocaleKey = 'en_US';
            user1.LocaleSidKey = 'en_US';
        	insert user1;
        }
        catch(exception e){
            system.debug('error msg '+ e.getMessage());
        }
    }
}