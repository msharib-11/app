public class Fibonacci_series {
    public static void fib(){
        integer t1 = 0, t2 = 1, next = 0, n = 10;
        system.debug(t1+ '\n'+t2);
        for(integer i=0; i<n; i++){      
            next = t1+t2;
            t1 = t2;
            t2 = next;
            system.debug(next);
        }
    }
}