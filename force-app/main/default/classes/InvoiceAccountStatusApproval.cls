public class InvoiceAccountStatusApproval {
    public static void accountStatusApproval(List <Invoice__c> invoiceList){        
        try{
            Set<Id> accIds = new Set<Id>();
        	for(Invoice__c inv: invoiceList){
            accIds.add(inv.Account__c);
        	}
        
        	List <Account> accList = 
            [SELECT Id, Name, Approval_Status__c,(SELECT Id, Name, StageName FROM Opportunities),
            (SELECT Id, Name, Invoice_Status__c, Invoice_Due_Date__c, Amount__c FROM Invoices__r)
            FROM Account WHERE Id IN :accIds LIMIT 49999];
        
	        List <CampaignMember> camList = [SELECT Id, contact.AccountId From CampaignMember 
                                         WHERE contact.AccountId in :accIds LIMIT 49999];
        List <Account> accUpdate = new List<Account>();
        
        for(Account acc: accList){
            integer totalClosedWonOpp = 0;
            for(opportunity op: acc.opportunities){
                if(op.stageName == 'Closed Won'){
                    totalClosedWonOpp++;
                }
            }
            
            Integer numberOfOverdueInvoices = 0;
        	Decimal totalOutstandingBalance = 0;
            for(Invoice__c inv: acc.Invoices__r){
                if(inv.Invoice_status__c == 'Unpaid'){
                    totalOutstandingBalance += inv.Amount__c;
                    if(inv.Invoice_due_date__c < Date.today()){
                    numberOfOverdueInvoices++;
                	}
                }
            }
            
            Decimal successfulMembersCount = 0;
            for(CampaignMember cam: camList){
                if(cam.Contact.AccountId == acc.Id){
                    if(cam.CampaignMember_status__c == 'Successfull'){
                        successfulMembersCount++;
                    }
                }
            }
            decimal engagementLevel = 0;
            if(camList.size() > 0){
                engagementLevel = (successfulMembersCount/camList.size())*100;
            }
            
            if(totalClosedWonOpp >= 2 && totalOutstandingBalance < 45000 && numberOfOverdueInvoices <=1 && successfulMembersCount >= 50.00){
                acc.Approval_status__c = 'Successfull';
            }
            else {
                acc.Approval_status__c = 'Requires Review';
            	}
        	}
        	Update accList;
        }
        catch(DMLexception e){
            system.debug(e.getMessage());
        } 
    }
}