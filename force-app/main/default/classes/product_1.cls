// Create New Price book 'Algo Pricebook' and 10 Products with Prices in the Pricebook

public class product_1 {
    public static string creProduct(){
        list <Product2> proList = new List <Product2>();
        for(integer i=1; i<=5; i++){
            Product2 pro = new Product2();
        	pro.Name = 'pc '+i;
        	pro.IsActive = true;
        	pro.ProductCode = 'pc01'+i;
            proList.add(pro);
        }
        if(!proList.isEmpty()){
            insert proList;
        }
        return proList[0].name;
    }
    
    public static string crePriceBook(){
        PriceBook2 pb = new PriceBook2();
        pb.Name = 'PriceBook pc';
        pb.IsActive = true;
        insert pb;
        return pb.name;
    }
    
    public static decimal crePriceBookEntry(){
        List <Product2> proList = [SELECT name FROM product2 where name like 'pc%'];
        Pricebook2 pb = [select id from PriceBook2 where name = 'PriceBook pc'];
        List <PriceBookEntry> pbeList = new List<PriceBookEntry>();
        for(Product2 p: proList){
            PriceBookEntry pbe = new PriceBookEntry();
            pbe.UnitPrice = 20;
            pbe.Pricebook2Id = pb.Id;
            pbe.Product2Id = p.Id;
            pbe.UseStandardPrice = False;
            pbeList.add(pbe);
        }
        if(!pbeList.isempty()){
            insert pbeList;
        }
        return pbeList[0].UnitPrice;
    }
}