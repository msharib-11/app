@isTest
public class Test9_05 {
	@TestSetup
    public static void function(){
        Account ac = new Account();
        ac.Name = 'acc123';
        ac.Working_in__c = 'ASIA';
        insert ac;
        opportunity op = new opportunity();
        op.AccountId = ac.Id;
        op.Name = 'opp1';
        op.StageName = 'closed won';
        op.CloseDate = date.today();
        insert op;
        
        //List <Product2> proList = new List <Product2>();
        Product2 pro = new Product2();
       	pro.Name = 'pro';
        insert pro;
        
        /*Pricebook2 pb = new Pricebook2();
        pb.name = 'pbook';
        pb.IsActive = true;
        insert pb;
		*/
   
        	PricebookEntry pbe = new PricebookEntry();
        	pbe.Pricebook2Id = test.getStandardPricebookId();
        	pbe.Product2Id = pro.Id;
        	pbe.IsActive = true;
        	pbe.UnitPrice = 100;
            insert pbe;
        

                OpportunityLineItem ol = new OpportunityLineItem();
        		ol.PricebookEntryId = pbe.Id;
        		ol.Product2Id = pro.id;
        		ol.OpportunityId = op.Id;
        		ol.Quantity = 200;
        		ol.TotalPrice = 50000;
        	
        insert ol;
    }
    @isTest
    public static void function1(){
        test.startTest();
        Task09_05.totalQuantity();
        test.stopTest();
            
        Opportunity op = [select Account.name, TotalOpportunityQuantity From Opportunity where Account.working_in__c = 'ASIA' And stageName = 'Closed won'];
        system.assertEquals(200, op.TotalOpportunityQuantity, 'err');
    }
}