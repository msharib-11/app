/**
* @description       : This class is used to dynamically fetch records and field name to be used in LWC datatable.
* @author            : Mayank Kumar Gupta
* @group             : Group A => MayankGupta, Ayush Raj, Kavya Srivastava, Prerna Jhingran, Rohit Kumar.
* @last modified on  : 07-24-2023
* @last modified by  : Mayank Kumar Gupta
**/
public without sharing class ProjectDatatableHelper {
    @AuraEnabled
    public static string getFieldsAndRecords(String strObjectApiName, String strfieldSetName, String criteriaField, String criteriaFieldValue, String objectApiName, String fieldSetName){
        try {
            System.debug('strObjectApiName ' + strObjectApiName + ' strfieldSetName ' + strfieldSetName + ' criteriaField - '+ criteriaField +'criteriaFieldValue - '+criteriaFieldValue+' objectApiName - '+objectApiName+' fieldSetName - '+fieldSetName);
            Map<String, String> returnMap = new Map<String,String>();
            if(!String.isEmpty(strObjectApiName) && !String.isEmpty(strfieldSetName) && !String.isEmpty(objectApiName) && !String.isEmpty(fieldSetName)){
                //get fields from FieldSet
                SObject sObj = (SObject)(Type.forName('Schema.'+ strObjectApiName).newInstance());
                List<Schema.FieldSetMember> lstFSMember = sObj.getSObjectType().getDescribe().fieldSets.getMap().get(strfieldSetName).getFields();
                
                //prepare SOQL query based on fieldAPIs	
                String query = 'SELECT ';
                for(Schema.FieldSetMember f : lstFSMember) {
                    query += f.getFieldPath() + ', ';
                }
                query += 'Id FROM ' + strObjectApiName ;
                
                //Just in case criteria field not specified then it will return all records
                if(!(String.isEmpty(criteriaField) && String.isEmpty(criteriaFieldValue))){
                    query += ' WHERE ' + criteriaField + '=\'' + criteriaFieldValue + '\'';
                }
                system.debug('on 30>>>>');          
                //execute query
                List<SObject> lstRecords = Database.query(query);
                system.debug('at 33>>>>');
                //For other object
                //get fields from FieldSet
                SObject sObjForSecondObject = (SObject)(Type.forName('Schema.'+ objectApiName).newInstance());
                List<Schema.FieldSetMember> lstFSMemberForSecondObject = 
                    sObjForSecondObject.getSObjectType().getDescribe().fieldSets.getMap().get(fieldSetName).getFields();
                
                //prepare SOQL query based on fieldAPIs	
                String queryForSecondObject = 'SELECT ';
                for(Schema.FieldSetMember f : lstFSMemberForSecondObject) {
                    queryForSecondObject += f.getFieldPath() + ', ';
                }
                queryForSecondObject += 'Id, Project__c, project__r.Name FROM ' + objectApiName ;
                
                //Just in case criteria field not specified then it will return all records
                // if(!(String.isEmpty(criteriaField) && String.isEmpty(criteriaFieldValue))){
                //     queryForSecondObject += ' WHERE ' + criteriaField + '=\'' + criteriaFieldValue + '\'';
                // }
                system.debug('at 52>>>>');         
                //execute query
                List<SObject> lstRecordsForSecondObject = Database.query(queryForSecondObject);
                System.debug('lstRecordsForSecondObject = ' + lstRecordsForSecondObject);
                //System.debug('lstFSMemberForSecondObject = ' + lstFSMemberForSecondObject);
                
                //prepare a map which will hold fieldList and recordList and return it
                returnMap.put('FIELD_LIST', JSON.serialize(lstFSMember));
                returnMap.put('RECORD_LIST', JSON.serialize(lstRecords));
                returnMap.put('MEMBER_FIELD_LIST', JSON.serialize(lstFSMemberForSecondObject));
                returnMap.put('MEMBER_RECORD_LIST', JSON.serialize(lstRecordsForSecondObject));
                //System.debug('Map is ' + returnMap);
                return JSON.serialize(returnMap);
            }
            return null;
        } 
        catch (Exception e) {
            System.debug('Error occured getFieldsAndRecords ::: ' + e.getMessage() + ' ln no ::: ' + e.getLineNumber());
            return null;
        }
    }
    /*
* @description       : This class is used to convert data into xml and send in mail.
* @author            : Prerna Jhingran
* @group             : Group A => MayankGupta, Ayush Raj, Kavya Srivastava, Prerna Jhingran, Rohit Kumar.
* @last modified on  : 07-24-2023
* @last modified by  : Prerna Jhingran
*/
    @AuraEnabled
    public static Map<String, String> sendXmlEmail(String emailId, String fieldlist, List<Object> projectData, String memberDetail){
        system.debug('memberdetail --'+memberDetail);
        system.debug('fieldList - '+fieldList);
        map<String, String> result = new map<String, String> ();
        try{
            if(String.isNotBlank(emailId) && String.isNotBlank(fieldlist) && String.isNotBlank(memberDetail) && projectData!=null)
            {
                Map<String, Object> detailsOfMember=(Map<String, Object>)JSON.deserializeUntyped(memberDetail);
                list<Object> listOfFields=(list<Object>)JSON.deserializeUntyped(fieldlist);
                
                List<String> csvRowValues = new List<String>();
                String csvColumnHeader='';
                Map<String, String> mapLabel= new Map<String, String>();
                for(Object ob:listOfFields){
                    
                    Map<String, Object> mpList = (Map<String, Object>)ob ;
                    System.debug('MapList>>>'+ mpList);
                    if(mpList.get('fieldName')!=null){
                        if(mpList.get('fieldName')=='URLField'){
                            mapLabel.put('Name', string.valueOf(mpList.get('label')));
                            csvColumnHeader+=mpList.get('label')+ ',';
                            continue;
                        }
                        mapLabel.put(string.valueOf(mpList.get('fieldName')), string.valueOf(mpList.get('label')));
                        csvColumnHeader+=mpList.get('label')+ ',';
                    }
                }
                csvColumnHeader+= 'Members';
                csvColumnHeader+='\n';
                for(Object rowVal: projectData){
                    String csvRowVal='';
                    Map<Object, Object> pdValue= ( Map<Object, Object>)rowVal;
                    for(String keys: mapLabel.keySet()){
                        String val= pdValue.containsKey(keys)?String.ValueOf(pdValue.get(keys)):'null';
                        csvRowVal+= val.escapeCsv() + ',';
                    }
                    List<String> res= new List<String>();
                    if(!((detailsOfMember.keySet()).contains(String.ValueOf(pdValue.get('Id'))))){
                        res.add('null');
                    }
                    else{
                        String md= JSON.serialize(detailsOfMember.get(String.ValueOf(pdValue.get('Id'))));
                        md = md.replaceAll('[""]', '');
                        md= md.substring(1,md.length()-1);
                        md = md.replace('\\', '');
                        res = md.split(',');
                    }
                    for(String s: res){
                        integer len= listOfFields.size() -2;
                        csvRowVal+= s + '\n';
                        while(len>=0){
                            csvRowVal+= ',';
                            len--;
                        }
                    }
                    csvRowVal.removeEnd('\n');
                    system.debug('csv'+csvRowVal);
                    csvRowValues.add(csvRowVal);
                }
                
                System.debug('List of String to be passed:::'+ csvRowValues);
                String xmlData = csvColumnHeader + String.join(csvRowValues,'\n');
                System.debug('xmlData' +xmlData);
                EmailTemplate emailTemplate = [Select Id from EmailTemplate where name = 'TeamManagementTask'];
                Messaging.EmailFileAttachment xmlAttachment = new Messaging.EmailFileAttachment();
                Blob xmlBlob = blob.valueOf(xmlData);
                String xmlName = 'ProjectDetails.csv';
                xmlAttachment.setFileName(xmlName);
                xmlAttachment.setBody(xmlBlob);
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setTemplateID(emailTemplate.Id);
                String[] toAddresses = new String[]{emailId};
                    String subject = 'Show Project Details';
                email.setSubject(subject);
                email.setToAddresses(toAddresses);
                email.setPlainTextBody('Project Details are: ');
                email.setFileAttachments(new Messaging.EmailFileAttachment[]{xmlAttachment});
                Messaging.SendEmailResult[] r = Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
                if (r[0].success) {
                    System.debug('The email was sent successfully.');
                    result.put('SUCCESS', 'The email was sent successfully.');
                }
            }
            return result;
        } 
        catch (Exception e) {
            System.debug('The email failed to send: ' + e.getMessage()+e.getLineNumber());
            result.put('ERROR', 'The email failed to send');
            return result;
        }
    }
    
    @AuraEnabled
    public static Map<String, String> sendXmlEmailForMembers(String emailId, String fieldlist, List<Object> projectData)
    {
        map<String, String> result = new map<String, String> ();
        try
        {
            if(String.isNotBlank(emailId) && String.isNotBlank(fieldlist) && projectData!=null){
                list<Object> listOfFields=(list<Object>)JSON.deserializeUntyped(fieldlist);
                System.debug('List of Fields>>>'+ listOfFields);
                List<String> csvRowValues = new List<String>();
                String csvColumnHeader='';
                Map<String, String> mapLabel= new Map<String, String>();
                integer obSize= listOfFields.size()-1;
                for(Object ob:listOfFields){
                    if(obSize>0){
                        Map<String, Object> mpList = (Map<String, Object>)ob ; 
                        {
                            mapLabel.put(string.valueOf(mpList.get('fieldName')), string.valueOf(mpList.get('label')));
                            csvColumnHeader+=mpList.get('label')+ ','; 
                        }
                        obSize--;
                    }
                }
                csvColumnHeader=csvColumnHeader.removeEnd(',');
                csvColumnHeader+='\n';
                for(Object rowVal: projectData){
                    String csvRowVal='';
                    Map<Object, Object> pdValue= ( Map<Object, Object>)rowVal;
                    for(String keys: mapLabel.keySet()){
                        String val= pdValue.containsKey(keys)?String.ValueOf(pdValue.get(keys)):'null';
                        csvRowVal+= val.escapeCsv() + ',';
                    }
                    csvRowVal=csvRowVal.removeEnd(',');
                    csvRowValues.add(csvRowVal);
                }
                String xmlData = csvColumnHeader + String.join(csvRowValues,'\n');
                
                EmailTemplate emailTemplate = [Select Id from EmailTemplate where name = 'TeamManagementTask'];
                Messaging.EmailFileAttachment xmlAttachment = new Messaging.EmailFileAttachment();
                Blob xmlBlob = blob.valueOf(xmlData);
                String xmlName = 'ProjectDetails.csv';
                xmlAttachment.setFileName(xmlName);
                xmlAttachment.setBody(xmlBlob);
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setTemplateID(emailTemplate.Id);
                String[] toAddresses = new String[]{emailId};
                String subject = 'Show Project Details';
                email.setSubject(subject);
                email.setToAddresses(toAddresses);
                email.setPlainTextBody('Project Details are: ');
                email.setFileAttachments(new Messaging.EmailFileAttachment[]{xmlAttachment});
                Messaging.SendEmailResult[] r = Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
                if (r[0].success) {
                    result.put('SUCCESS', 'The email was sent successfully.');
                }
            }
            return result;
        }
        catch (Exception e) {
            System.debug('The email failed to send: ' + e.getMessage()+':::'+e.getLinenumber()+':::'+e.getCause());
            result.put('ERROR', 'The email failed to send');
            return result;
        }
    }
}