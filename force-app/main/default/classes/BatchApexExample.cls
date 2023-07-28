global class BatchApexExample implements Database.Batchable<sObject>{
    global Database.QueryLocator start(Database.BatchableContext bc){
        string query = 'select id, name from Account';
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext bc, List <Account> accList){
        for(Account acc: accList){
            acc.Name = acc.name+'Dehradun';
        }
        try{
        update accList;
    }
    	catch(Exception e){
        system.debug(e);
    	}
    }
    
    global void finish(Database.BatchableContext bc){
    
	}
}