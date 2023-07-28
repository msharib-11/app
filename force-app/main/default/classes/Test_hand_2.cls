@isTest
public class Test_hand_2 {
	@isTest
    public static void fun(){
        opportunity op = new opportunity();
        op.name = 'opp new';
        op.stagename = 'closed lost';
        op.CloseDate = date.newInstance(2023, 03, 03);
        
        Test.startTest();
        Database.SaveResult res = Database.insert(op,false);
        Test.stopTest();
        
        system.assert(!res.isSuccess());
    }
}