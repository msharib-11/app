/*
A to B- 10km 
B to C- 20km 
C to D- 38 km 
D to E- 83 km 
E to F- 73 km 
Write a script to update the the total distance fields of Order_locoation__c with distance 
b/w travel Location and account Location if and only if account having location A or F.
*/

public class Task04_05 {
    public static void upDateLocation(){
        List <Account> accList = [select id, name, Location__c from Account where Location__c != NULL];
        List <Order_Location__c> olList = [select id, name, Total_Distance__c, Travel_Loaction__c from Order_Location__c];
        
        for(Account ac: accList){
            if(ac.Location__c == 'A'){
                for(Order_Location__c ol: olList){
                    if(ol.Travel_Loaction__c == 'B'){
                        ol.Total_Distance__c = 10;
                    }
                    else if(ol.Travel_Loaction__c == 'C'){
                        ol.Total_Distance__c = 30;
                    }
                    else if(ol.Travel_Loaction__c == 'D'){
                        ol.Total_Distance__c = 68;
                    }
                    else if(ol.Travel_Loaction__c == 'E'){
                        ol.Total_Distance__c = 68+83;
                    }
                    else{
                        ol.Total_Distance__c = 68+83+73;
                    }
                }
            }
            else if(ac.Location__c == 'F'){
				    for(Order_Location__c ol: olList){
                    if(ol.Travel_Loaction__c == 'A'){
                        ol.Total_Distance__c = 224;
                    }
                    else if(ol.Travel_Loaction__c == 'B'){
                        ol.Total_Distance__c = 214;
                    }
                    else if(ol.Travel_Loaction__c == 'C'){
                        ol.Total_Distance__c = 194;
                    }
                    else if(ol.Travel_Loaction__c == 'D'){
                        ol.Total_Distance__c = 73+83;
                    }
                    else if(ol.Travel_Loaction__c == 'E'){
                        ol.Total_Distance__c = 73;
                    }
                }                
            }
        }
        update olList;
    }
}