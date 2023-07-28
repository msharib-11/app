// Create 10 Products with different Product Names, Description & Family

public class Product1 {
    public static List<Product2> creProduct(){
        List <Product2> proList = new List <Product2>();
        for(integer i=1; i<=20; i++){
            Product2 pro = new Product2();
            pro.Name = 'Cric-Balls '+i;
            pro.Description = 'Having good bounce '+i;
            pro.Family = 'Cricbuzz';
            proList.add(pro);
        }
        if(!proList.isEmpty()){
            insert proList;
        }
        return proList;
    }
}