@isTest
public class test_hand_3 {
@istest
    public static void testhandlerclass()
    {
        product2 p = new product2();
        p.Name='Test1';
       	pricebook2 pb = new pricebook2();
        pb.Name='Standard Price Book';
        pb.IsActive=True;
        
        
        id a =test.getStandardPricebookId();
       	
        pb.id= a;
        update pb;
        
        
       
        test.startTest();
        insert p;
        test.stopTest();
        
        list<PricebookEntry> pbeList=[Select name, product2id,unitprice from pricebookentry where product2id=:p.Id and pricebook2id=:pb.Id];
        system.assertEquals(1,pbeList[0].unitprice);
    }
}