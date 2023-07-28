// Create a look up[Lead] on product so that Products come over in related list of a Lead. 
// Write script to create 3 Leads and 5 Products with Lead lookup field.

public class Task06_05 {
    public static void creLead(){
        List <Lead> leadList = new List <Lead>();
        for(integer i=1; i<=3; i++){
            Lead l = new Lead();
            l.FirstName = 'Aman '+i;
            l.LastName  = 'Mishra '+i;
            l.Company = 'Cloud Analogy';
            l.LeadSource = 'Web';
            leadList.add(l);
        }
        insert leadList;
        
        List <Product2> proList = new List <Product2>();
        integer j = 1;
        for(Lead lea: leadList){
            for(integer i=1; i<=5; i++){
                Product2 pro = new Product2();
            	pro.LeadsP__c = lea.id;
                pro.Name = 'Lead-Pro '+j;
                pro.ProductCode = 'Leadpro1'+j;
                j++;
                proList.add(pro);
            }
        }
        insert proList;
    }
}