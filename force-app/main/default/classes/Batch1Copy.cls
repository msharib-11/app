global class Batch1Copy implements database.Batchable<sobject>{
    global list<Account> start(database.BatchableContext x){
        list <Account> accList = [select id, name, BillingStreet, BillingCity, BillingPostalCode from 
                                  Account where name like 'SBI'];
        return accList;
    }
    global void execute(database.BatchableContext x, List<Account> acList){
        
        List <contact> conList = [select id, AccountId from contact where Accountid in :acList];
        for(Account a: acList){
            for(contact con: conList){
                if(a.id == con.Accountid){
                    con.mailingStreet = a.BillingStreet;
                	con.mailingCity = a.BillingCity;
                	con.mailingPostalCode = a.BillingPostalCode;
                }
            }
            update conList;
        }
    }
    global void finish(database.BatchableContext b){
        
    }
}