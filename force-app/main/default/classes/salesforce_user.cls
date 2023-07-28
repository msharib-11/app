// Display the current salesforce user details 'Name', 'Number' & 'EmailId'

public class salesforce_user {
    public static String currentuser(){
    	user userList = [select name, phone, email from user where email = :userinfo.getUserEmail()LIMIT 1];
    	system.debug(userList);
        return userList.name;
    }
}