/*
*********************************************************
Apex Class Name    : resumeDisplayApex
@description       : This is class is used for controlling the resumeDisplayComponent for Team Management Task
*********************************************************
*/
public with sharing class resumeDisplayApex {
    /*
    *********************************************************
    @Method Name    : fetchResume
    @description    : apex method for retriving resume data
    @param          : objectName   ==> contains name of the sObject
                      fieldSetName ==> contains name of the fieldSet
    @return         : List<Resume__c> ==> contains record data for Resume__c object
    ********************************************************
    */
        @AuraEnabled(cacheable=true)
        public static List<sObject> fetchResume(String objectName, String fieldSetName) {
            List<sObject> result=new List<sObject>();
            try {
                List<Schema.FieldSetMember> fields=Schema.getGlobalDescribe().get(objectName).getDescribe().FieldSets.getMap().get(fieldSetName).getFields();
                String query='SELECT Id';
                for(Schema.FieldSetMember field: fields) {
                    query+=', '+field.getFieldPath();
                }
                query+=' FROM '+objectName;
                result=Database.query(query);
            }
            catch(Exception e) {
                System.debug('\n\t'+ e.getTypeName()+'\n\tERROR ON LINE --> '+ e.getLineNumber()+ '\n\tERROR MESSAGE --> '+ e.getMessage());
            }
            return result;
        }
    /*
    *********************************************************
    @Method Name    : fetchFields
    @description    : apex method for retriving fields data for Resume__c
    @param          : objectName   ==> contains name of the sObject
                      fieldSetName ==> contains name of the fieldSet
    @return         : List<Map<String, String>> ==> contains maps of two string objects, key(field API name) and value(field label)
    ********************************************************
    */
        @AuraEnabled(cacheable=true)
        public static List<Map<String, String>> fetchFields(String objectName, String fieldSetName) {
            List<Map<String, String>> fieldList=new List<Map<String, String>>();
            try {         
                List<Schema.FieldSetMember> fields=Schema.getGlobalDescribe().get(objectName).getDescribe().FieldSets.getMap().get(fieldSetName).getFields();
                for(Schema.FieldSetMember field: fields) {
                    Map<String, String> fieldMap=new Map<String, String>();
                    fieldMap.put(field.getFieldPath(), field.getLabel());
                    fieldList.add(fieldMap);
                }
            }
            catch(Exception e) {
                System.debug('\n\t'+ e.getTypeName()+'\n\tERROR ON LINE --> '+ e.getLineNumber()+ '\n\tERROR MESSAGE --> '+ e.getMessage());
            }
            return fieldList;
        }
    }