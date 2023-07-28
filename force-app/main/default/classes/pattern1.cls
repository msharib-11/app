public class pattern1 {
    public static void pattern(){
        for(integer i=0; i<5; i++){
            string s = ' ';
            for(integer j=0; j<=i; j++){
                s = s + '*';
            }
            system.debug(s);
        }
    }
}