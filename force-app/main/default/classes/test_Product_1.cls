@isTest
public class test_Product_1 {
    @testSetup
    public static void setup1(){       
        list <Product2> proList1 = new List <Product2>();
        for(integer i=1; i<=5; i++){
            Product2 pro = new Product2();
        	pro.Name = 'p1'+i;
        	pro.IsActive = true;
        	pro.ProductCode = 'pc01'+i;
            proList1.add(pro);
        }
        insert proList1;
    }
    public static void setup2(){
        PriceBook2 pb = new PriceBook2();
        pb.Name = 'PriceBook pc';
        pb.IsActive = true;
        insert pb;
    }
    Public static void setup3(){
        List <Product2> proList = [SELECT name FROM product2 where name like 'p%'];
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
        insert pbeList;
    }
    
    @isTest
    public static void method1(){
        system.Test.startTest();
        string n = product_1.creProduct();
        string s = product_1.crePriceBook();
        decimal m = product_1.crePriceBookEntry();
        system.Test.stopTest();
        
        system.assertEquals('p11', n, 'error');
        system.assertEquals('PriceBook pc', s, 'error');
        system.assertEquals(20.00, m, 'error');
    }
    
}