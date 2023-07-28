// Create 4 Pricebooks ASIA, EMA, NA and SA. Write a trigger on Opportunity which should not allow user 
// to add a Pricebook in the Opportunity which is not present in Account Multipicklist Working in (ASIA, EMA, NA, SA)". 
public class handlerclass16_06 {
    public static void method(List <opportunity> oppList){
       list<string> slist= new list<string>();
        slist.add('asia');
        slist.add('ema');
        slist.add('sa');
        slist.add('na');
        list<Account> accList= [SELECT ID,Working_in__c FRoM ACCOUNT WHERE WORKING_in__c in :slist];
        list<Pricebook2> pbList=[SELECT ID,Name FROM PRICEBOOK2 where name in :slist];
        
        for(opportunity op: oppList){
          
            integer i=0;
            for(Account ac: accList){
                if(ac.id==op.AccountId){
                    i=1;
                }   
            }
            if(i==0 ){
                for(PriceBook2 pb:pbList)
                {    
                	if(pb.id==op.Pricebook2Id)
                	op.adderror('cant add pricebook');
                }
            } 
    	}
    }
}