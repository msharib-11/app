public with sharing class LwcBrainstorming {
    @AuraEnabled(cacheable=true)
    public static decimal method(string oId, string name){
        try {
            decimal bonus = 0;
            List <Employee__c> empList = [select id, name, salary__c From Employee__c];
            List <Performance__c> perList = [select Employee__r.Id, sales_revenue__c, customer_satisfaction_score__c, Attendance__c from Performance__c];
        
            
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
                
            }
            return bonus;
        }

        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}