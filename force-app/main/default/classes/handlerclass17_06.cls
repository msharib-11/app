public class handlerclass17_06 {
    public static void method(List <Contact> conList){
        for(contact con: conList){
            if(con.SAME_COUNTRY_AS_USER_COMPANY__c	== true){
                con.adderror('Can not create contact with same user details');
            }
        }
    }
}