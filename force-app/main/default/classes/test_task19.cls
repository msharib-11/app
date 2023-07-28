@isTest
public class test_task19 {
	@isTest
    public static void method(){
        test.startTest();
        Task19.creCase();
        test.stopTest();

        List <case> csList = [select id, status from case where status = 'Working'];
        system.assertEquals(5, csList.size());
    }
}