public class primeNum {
    public static void isprime(){
        for(integer i=5; i<500; i++){
            integer count = 0;
            for(integer j=2; j<i; j++){
                if(math.mod(i,j)==0){
                    count++;
                    break;
                }  
            }
            if(count > 0){
                system.debug('not prime ');
            }
            else {
                system.debug('prime ' + i);
            }
            count = 0;
        }
    }
}