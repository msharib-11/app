public class handlerclass20_06 {
    public static void method(List <Contact> conList){
        for(contact c: conList){
            Account acList1 = [select id, ShippingStreet, ShippingCity, ShippingPostalCode
        	from Account where id = :c.AccountId];
            c.MailingStreet = acList1.ShippingStreet;
            c.MailingCity = acList1.ShippingCity;
            c.MailingPostalCode = acList1.ShippingPostalCode;
        }
    }
}