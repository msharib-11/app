@istest
public class testBrainstorming {
	@istest
    public static void function(){
        Employee__c emp = new Employee__c();
        emp.Name = 'abcd';
        emp.Salary__c = 20000;
        emp.New_monthly_bonus__c = 0;
        emp.Your_monthly_bonus__c =0;
        insert emp;
        
        Performance__c per = new Performance__c();
        per.Employee__c = emp.Id;
        per.customer_satisfaction_score__c = 7;
        per.sales_revenue__c = 25000;
        per.Attendance__c = 22;
        insert per;
        system.Test.startTest();
        BrainstormingApex2.monthlyBonus1();
        system.Test.stopTest();

        Employee__c emp1 = [SELECT New_monthly_bonus__c FROM Employee__c WHERE Id = :emp.Id];
        system.assertEquals(1000, emp1.New_monthly_bonus__c, 'err');
    }
}