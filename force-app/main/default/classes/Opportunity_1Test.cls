@isTest
Private class Opportunity_1Test {
	@isTest
    Public static void createTest() {
        system.Test.startTest();
        Opportunity_1.createOpp();
        system.Test.stopTest();
        
        List <Opportunity> opList = [select name from opportunity where name like 'Our_%'];
        system.assertEquals(10, opList.size(), 'Error');
    }
}