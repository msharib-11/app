public class Bs_8 {
    public static void function(){
        List <Song__c> songList = [select id, name, favourite__c from song__c where contact__c != NULL];
        for(Song__c s: songList){
            if(s.favourite__c == TRUE){
                system.debug(s.name);
            }
        }
        for(Song__c s: songList){
            if(s.favourite__c == false){
                system.debug(s.name);
            }
        }
    }
}