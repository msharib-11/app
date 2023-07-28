@isTest
public class Test8_05 {
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
        
        List <Product2> proList = new List <Product2>();
        for(integer i=1; i<=3; i++){
            Product2 pro = new Product2();
        	pro.Name = 'pro'+i;
        	proList.add(pro);
        }
		insert proList;
        
        /*Pricebook2 pb = new Pricebook2();
        pb.name = 'pbook';
        pb.IsActive = true;
        insert pb;
		*/
        List <PricebookEntry> pbeList = new List <PricebookEntry>();
        for(Product2 p: proList){
        	PricebookEntry pbe = new PricebookEntry();
        	pbe.Pricebook2Id = test.getStandardPricebookId();
        	pbe.Product2Id = p.Id;
        	pbe.IsActive = true;
        	pbe.UnitPrice = 100;
        	pbeList.add(pbe);
        }
        insert pbeList;
        List <OpportunityLineItem> oliList = new List <OpportunityLineItem>();
        for(Product2 p: proList){
            for(PricebookEntry pbe: pbeList){
                OpportunityLineItem ol = new OpportunityLineItem();
        		ol.PricebookEntryId = pbe.Id;
        		ol.Product2Id = p.id;
        		ol.OpportunityId = op.Id;
        		ol.Quantity = 200;
        		ol.TotalPrice = 50000;
        		oliList.add(ol);
            }
        }
        insert oliList;
    }
    @isTest
    public static void function2(){
        test.startTest();
        Task08_05.OppLineItem();
        test.stopTest();
		
        List <aggregateResult> o = [select opportunity.Account.name acc, count(id) From OpportunityLineItem where opportunity.Account.name != Null Group by opportunity.Account.name having count(id)>=2];
        system.assertEquals('acc123', o[0].get('acc'), 'err');
    }
}