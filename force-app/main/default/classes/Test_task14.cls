@isTest
public class Test_task14 {
    @Testsetup
    public static void method(){
        List <Product2> opList = new List <Product2>();
        for(integer i=1; i<=2; i++){
            Product2 pro = new Product2();
        	pro.Name = 'pro';
        	pro.Description = 'A product';
        	opList.add(pro);
        }
        insert opList;
    }
	@isTest
    public static void func(){
        system.Test.startTest();
        Task14.productDes();
        system.Test.stopTest();
        
        List <Product2> proList = [select name from product2 where description like '%a%'];
        system.assertEquals(2, proList.size(), 'err');
    }
}