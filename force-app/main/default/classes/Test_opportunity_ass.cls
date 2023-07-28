@isTest
public class Test_opportunity_ass {
	@isTest
    public static void method1(){
		system.Test.startTest();
        Opportunity_ass.creOpportunity();
        system.Test.stopTest();
        
        List <opportunity> olist = [select name From opportunity];
        system.assertEquals(20, olist.size(), 'Error');
    }
}