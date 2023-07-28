// create a trigger on product to make it's entry in standard price book as $1

public class HandlerClass_product2 {
    public static void HandlerMethod(List <Product2> proList){
		List <PriceBook2> pbList = [select id, name from PriceBook2 where IsStandard = true];
        List <PriceBookEntry> pbeList = new List <PriceBookEntry>();
        for(Product2 pro: proList){
            for(priceBook2 p: pbList){
                PriceBookEntry pbe1 = new PriceBookEntry();
                pbe1.UnitPrice = 10;
                pbe1.Pricebook2Id = p.id;
                pbe1.Product2Id = pro.Id;
                pbe1.UseStandardPrice = false;
                pbe1.IsActive = true;
                pbeList.add(pbe1);
            }
        }
        insert pbeList;
    }
}