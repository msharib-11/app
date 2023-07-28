// Write a trigger to restrict a doctor to have more than 8 visit request in a day and 
// restrict a patient to visit the same doctor twice in a day.
public class Bs_9 {
    public static void function(List <Appointment__c> apList){
        for(Appointment__c ap: apList){
            List <Appointment__c> apList1 = [select id from Appointment__c where AppointmentDate__c = :ap.AppointmentDate__c and Doctor__c = :ap.Doctor__c];
            if(apList1.size()>=8){
                ap.adderror('Doctor is unavailiable');
            }
            List <Appointment__c> apList2 = [select id from Appointment__c where AppointmentDate__c = :ap.AppointmentDate__c and Patient__c = :ap.Patient__c];
            if(apList1.size()>=1){
                ap.adderror('Patient do not need to visit again');
            }
        }
    }
}