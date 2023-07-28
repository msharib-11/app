public class ReverseInt {
    public static integer reverse(integer n){
        integer temp = n, res=0;
        while(temp!=0){
            integer r = math.mod(temp, 10);
            res = res*10 + r;
            temp = temp/10;
        }
        system.debug(res);
        return res;
    }
}