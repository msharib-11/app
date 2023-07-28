public class fib_series {
    public static integer fibseries(){
        integer t1=0, t2=1, next;
        for(integer i=0; i<10; i++){
            if(i==0){
                system.debug(t1);
            }
            else if(i==1){
                system.debug(t2);
            }
            else {
            	next = t1+t2;
            	system.debug(next);
                t1 = t2;
            	t2 = next;
            }
        }
        return next;
    }
}