global class BonusAsync implements Database.Batchable<sObject>, schedulable {
    global List<Employee__c> start (Database.BatchableContext BC){
         list<Performance__c> pList=[select Attendance__c,customer_satisfaction_score__c,sales_revenue__c,Name,Employee__r.Name,Employee__r.New_monthly_bonus__c,Employee__c from Performance__c where 
                                                          createdDate=this_Month ];
       list<employee__c> eList=[select Name,New_monthly_bonus__c, Salary__c, Email__c from Employee__c];
        for(Employee__c e:eList)
        {	
            decimal b=0;
            for(Performance__c p:pList)
            {	
                if(e.id==p.Employee__r.id){
                   b=e.Salary__c*0.05;
                }
            }
         e.New_monthly_bonus__c=b;
        }
        return eList;
    }
    global void execute (Database.BatchableContext BC,list<Employee__c> eList)
    {
        Database.update (eList,True);
        list<string> addr=new list<string>();
        for(Employee__c l:eList)
        {
            addr.add(l.Email__c);
        }
         List<messaging.SingleEmailMessage> maillist=new list<messaging.SingleEmailMessage>();
        for(Employee__c e:eList){
       
        Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
        mail.setSubject('Bonus');
        mail.setPlainTextBody('Bonus details\n Bonus'+e.New_monthly_bonus__c);
        mail.setToAddresses(addr);
          maillist.add(mail);
        }
        
       if(!maillist.isempty()){
            messaging.sendemail(maillist);
    }
    }
    global void finish(Database.BatchableContext BC)
    {
       
    }
    
    
      global void execute(SchedulableContext Sc)
    {
       BonusAsync a=new BonusAsync();
        id BatchId=Database.executeBatch(a);
    }
}

/*BonusAsync a=new BonusAsync();
string str='0 0 0 L * ?';
id jobid=System.schedule('Task',str,a);*/