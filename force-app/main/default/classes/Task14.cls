// Find all the Products having a Description field containing 'a' in it.

public class Task14 {
    public static void productDes(){
        List <Product2> proList = [select name from product2 where description like '%a%'];
        for(Product2 pro: proList){
            system.debug(pro);
        }
    }
}