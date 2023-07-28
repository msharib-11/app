@isTest
public class Test2_05 {
	@TestSetup
    public static void function(){
        Account ac = new Account();
        ac.Name = 'acc123';
        insert ac;
        opportunity op = new opportunity();
        op.AccountId = ac.Id;
        op.Name = 'opp1';
        op.StageName = 'closed won';
        op.CloseDate = date.today();
        insert op;
        
        Product2 p = new Product2();
        p.Name = 'pro1';
        insert p;
        /*Pricebook2 pb = new Pricebook2();
        pb.name = 'pbook';
        pb.IsActive = true;
        insert pb;
		*/
        PricebookEntry pbe = new PricebookEntry();
        pbe.Pricebook2Id = test.getStandardPricebookId();
        pbe.Product2Id = p.Id;
        pbe.IsActive = true;
        pbe.UnitPrice = 100;
        insert pbe;
        
        OpportunityLineItem ol = new OpportunityLineItem();
        ol.PricebookEntryId = pbe.Id;
        ol.Product2Id = p.id;
        ol.OpportunityId = op.Id;
        ol.Quantity = 200;
        ol.TotalPrice = 50000;
        insert ol;
    }
    @isTest
    public static void method(){
        test.startTest();
        Task2_05.getAccountOpportunity();
        test.stopTest();
		
        Account ac = [select id from Account where name = 'acc123'];
        opportunityLineItem oli = [select id, opportunity.AccountId from OpportunityLineItem where Quantity > 100 AND opportunity.stageName = 'Closed Won'];
        system.assertEquals(ac.id, oli.opportunity.AccountId, 'err');
    }
}