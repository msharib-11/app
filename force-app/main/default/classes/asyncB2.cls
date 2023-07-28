global class asyncB2 implements database.Batchable<sobject>{
    global list<Employee__c> start(database.BatchableContext bc){
        list<Employee__c>emplist=new list<Employee__c>();
        return emplist;
    }
    
    global void execute(database.BatchableContext bc , list<Employee__c> emplist){
		list<Performance__c> perList=[select Attendance__c,customer_satisfaction_score__c,sales_revenue__c,Name,Employee__r.Name,Employee__r.New_monthly_bonus__c,Employee__c from Performance__c where 
                                                          createdDate=this_Month ];
        decimal bonus = 0;
            for(Employee__c emp: empList){
            	for(Performance__c per: perList){
                	if(emp.Id == per.Employee__r.Id){
                    	if(per.sales_revenue__c > 21000 && per.customer_satisfaction_score__c > 7 && per.Attendance__c > 22){
                        	bonus = emp.Salary__c*0.1;
                    	}
                    	else if(per.sales_revenue__c > 15000 && per.customer_satisfaction_score__c > 5 && per.Attendance__c > 18){
                    	    bonus = emp.Salary__c*0.05;
                    	}
                    	else{
                        	bonus = emp.Salary__c*0;
                    	}
                	}
            	}
                emp.New_monthly_bonus__c = bonus;
            }
        	update empList;
        }
    
        global void finish(database.BatchableContext bc){
        
    }
}