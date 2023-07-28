/**
* @description       : 
* @author            : Kumar Pratyush Srivastava
* @group             : 
* @last modified on  : 07-20-2023
* @last modified by  : Kumar Pratyush Srivastava
**/
public with sharing class DynamicRecordFetcher {
     @AuraEnabled
     public static List<SObject> fetchRecords(String objectName, List<String> fieldsList) {
        String fieldsString = String.join(fieldsList, ',');
        String queryString = 'SELECT ' + fieldsString + ' FROM ' + objectName;
        try {
            System.debug(Database.query(queryString));
            return Database.query(queryString);
        } catch (Exception e) {
            System.debug('Error fetching records: ' + e.getMessage());
             
        }
         return new List<SObject>();
    }
}