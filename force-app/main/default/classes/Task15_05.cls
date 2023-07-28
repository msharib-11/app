// Create a new Product "Gandhiji Chasma". Add Price as 100$ in standard price bookand any other price books as 
// well. Create few opportunities with Opportunity line item "Gandhiji Chasma". Write a script to get the total 
// Price of all the Opportunity sold having Product "Gandhiji Chasma".

public class Task15_05 {
    public static void GandhiJi(){
        List <opportunityLineItem> olList = [Select TotalPrice, opportunity.name from opportunityLineItem where opportunity.name like 'Gc%'];
        decimal tPrice = 0;
        for(opportunityLineItem ol: olList){
            tPrice = tPrice + ol.totalPrice;
        }
        system.debug(tPrice);
    }
}