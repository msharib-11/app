@istest
public class TestBatchEx {
    @testSetup
    public static void function(){
        lead l = new lead();
        l.LastName = 'lead123';
        l.Company = 'ca';
        l.Status = 'close - converted';
        l.LeadSource = 'web';
        insert l;
    }
	@isTest
    public static void fun(){
        test.startTest();
        BatchEx obj = new BatchEx();
		id batchId = database.executeBatch(obj);
        test.stopTest();
    }
}