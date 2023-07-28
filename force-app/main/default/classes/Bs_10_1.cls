// Write a script to create 10 Person Account records and provide three loans to each.
public class Bs_10_1 {
    public static void function(){
        List <PersonAccount__c> paList = new List <PersonAccount__c>();
        for(integer i=1; i<=10; i++){
            PersonAccount__c pa = new PersonAccount__c();
            pa.PA_Name__c = 'account '+i;
            pa.Father_s_Name__c = 'Paccount '+i;
            pa.Address__c = 'Noida '+i;
            paList.add(pa);
        }
        insert paList;
        List <Loan_Data__c> ldList = new List <Loan_Data__c>();
        for(PersonAccount__c p: paList){
            for(integer i=1; i<=3; i++){
                Loan_Data__c ld = new Loan_Data__c();
                ld.PersonAccount__c = p.id;
                ld.Loan_Amount__c = 9000;
                ld.Loan_Status__c = 'Active';
                ld.Loan_taken_date__c = date.newInstance(2023, 03, 14);
                ld.Name__c = 'loan '+i;
                ldList.add(ld);
            }
        }
        insert ldList;
    }
}