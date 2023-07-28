@isTest
public class Test_reverse {
	@isTest
    public static void reversetest(){
        integer n = ReverseInt.reverse(1234);
        system.assertEquals(4321, n, 'Error');
    }
}