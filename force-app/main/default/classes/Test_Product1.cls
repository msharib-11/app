@istest
public class Test_Product1 {
	@isTest
    public static void method1(){
        List <Product2> proList = Product1.creProduct();
        integer n = proList.size();
        system.assertEquals(20, n, 'Error');
    }
}