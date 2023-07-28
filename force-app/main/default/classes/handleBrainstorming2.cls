public class handleBrainstorming2 {
    public static void updateBonus(List <Performance__c> perList){
        decimal bonus;
        List <Employee__c> empList = [select id, salary__c, New_monthly_bonus__c From Employee__c];
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
}