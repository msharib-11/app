@isTest
public class Test_accRev {
	@testSetup 
    public static void setup1(){
        List <Account> accList = new List <Account>();
        for(integer i=0; i<2; i++){
            Account ac = new Account();
            ac.name = 'Account';
            accList.add(ac);
        }
        insert accList;
    }
    
    @istest 
    public static void method1(){
        system.Test.startTest();
        Account_nameRvs.reverse();
        system.Test.stopTest();
    }
}