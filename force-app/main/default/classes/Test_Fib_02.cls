@isTest
public class Test_Fib_02 {
	@isTest
    public static void fib_test(){
        integer n = fib_series.fibseries(5);
        system.assertEquals(8, n, 'Error');
    }
}