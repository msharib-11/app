public class User_Detail {
    public static void userDetails(){
        List <user> userList = new List <User>();
        userList = [select name, email, phone, userrole.name, profile.name FROM user];
        
        for(user  u : userList){
            system.debug(u);
        }
    }
}