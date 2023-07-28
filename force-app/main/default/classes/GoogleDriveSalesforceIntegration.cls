public with sharing class GoogleDriveSalesforceIntegration {
    public static SalesforceGdriveIntegration__c gooleDriveCustom=[Select ClientId__c,ClientSecret__c,RedirectUri__c from SalesforceGdriveIntegration__c];
    public static String key=gooleDriveCustom.ClientId__c;
    public static String secret=gooleDriveCustom.ClientSecret__c;
    private Static string redirect_uri =gooleDriveCustom.RedirectUri__c;

    @AuraEnabled
    public static String createAuthURL() {
        try {
            String key = EncodingUtil.urlEncode(key,'UTF-8');
            String uri = EncodingUtil.urlEncode(redirect_uri,'UTF-8');
            String authuri = '';
            authuri = 'https://accounts.google.com/o/oauth2/auth?'+
            'client_id='+key+
            '&response_type=code'+
            '&scope=https://www.googleapis.com/auth/drive'+
            '&redirect_uri='+uri+
            '&access_type=offline';
            system.debug('auth>>>>>>>..'+ authuri);
            return authuri;    
        } 

        catch (Exception e) {
            throw new AuraHandledException(e.getmessage());
        }
    }

    @AuraEnabled
    public static String getAccessToken(String code)
    {
        try {
            HttpRequest req = new HttpRequest();
            req.setMethod('GET');
            req.setEndpoint('https://accounts.google.com/o/oauth2/token');
            req.setHeader('content-type', 'application/x-www-form-urlencoded');
            String messageBody = 'code='+code+'&client_id='+key+'&client_secret='+secret+'&redirect_uri='+redirect_uri+'&grant_type=authorization_code';
    
            req.setHeader('Content-length', String.valueOf(messageBody.length()));
            req.setBody(messageBody);
            req.setTimeout(60*1000);
    
            Http h = new Http();
            String resp;
            HttpResponse res = h.send(req);
            resp = res.getBody();
            System.debug('resp>>>>>>'+resp);
            Map<String,object> responseMap =(Map<String,object>)JSON.deserializeUntyped(res.getBody()) ;  
            String token =  String.valueOf(responseMap.get('access_token'));
            system.debug('token>>>>>'+token);
            return token;
        } 

        catch (Exception e) {
            throw new AuraHandledException(e.getmessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Object> getAllData(String token){
        try { 
            Http http=new Http();
            HttpRequest request=new HttpRequest();
            request.setEndpoint('https://www.googleapis.com/drive/v2/files');
            request.setMethod('GET');
            String bearerToken='Bearer'+' '+token;
            request.setHeader('Authorization', bearerToken);
            List<Object> driveData=new List<Object>();
            HttpResponse response=http.send(request);
            if(response.getStatusCode()==200){
                Map<String,Object> results=(Map<String,Object>)JSON.deserializeUntyped(response.getBody());
                System.debug(results);
                driveData=(List<Object>)results.get('items');
            }
            System.debug(driveData);
            return driveData;
        } 

        catch (Exception e) {
            throw new AuraHandledException(e.getmessage());
        }
    }
    
    
    @AuraEnabled(cacheable=true)
    public static String getAllViewData(String token,String row){
        String altLink='https://drive.google.com/file/d/'+row+'/view?usp=drivesdk';
        return altLink;
    }

    // @AuraEnabled
    // public static String uploadFile(String attachmentId, String accessToken) {
    //     // system.debug(attachmentId);
    //     // system.debug(accessToken);
    //     List<ContentVersion> cvFile = [SELECT VersionData,FileType,ContentDocumentId FROM ContentVersion WHERE Id =: attachmentId];
    //     Blob myBlob = cvFile[0].VersionData;
    //     String url = 'https://www.googleapis.com/upload/drive/v2/files?uploadType=media';
    //     string authorizationHeader = 'Bearer'+' '+ accessToken; 
    //     Integer contentSize = myBlob.size();
    //     HttpRequest req = new HttpRequest();
    //     req.setheader('Authorization',authorizationHeader);
    //     req.setheader('Content-Length',String.valueOf(contentSize));
    //     req.setheader('Content-Type','image/'+cvFile[0].FileType);
    //     req.setMethod('POST'); 
    //     req.setEndpoint(url); 
    //     req.setBodyAsBlob(myBlob); 
    //     Http h = new Http(); 
      
    //     Httpresponse resp = h.send(req);
    //     System.debug('Response'+resp.getBody());
    //     System.debug('Blob>>>'+myBlob);
    //     System.debug('cvfile>>'+cvFile);
	//     //After file was successfully upload we delete the file
    //     delete new ContentDocument(Id = cvFile[0].ContentDocumentId);
    //     return String.valueOf(resp.getStatuscode());
    // }
    
    // @AuraEnabled
    // public static Boolean uploadFileContent(String fileContent,String token,String fileName,String fileType) {
    //     try {
    //         System.debug('type>>>>>>>>>>>>>'+fileType);
    //         System.debug('file>>>>>>>>>>>>>'+fileContent);
    //         System.debug('access_token>>>>>>>>>>>>>'+token);
    //         Blob blbObj=EncodingUtil.base64Decode(fileContent);
    //         Http http=new Http();
    //         HttpRequest request=new HttpRequest();
    //         request.setEndpoint('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
    //         request.setMethod('POST');
    //         request.setHeader('Authorization', 'Bearer'+' '+token);
    //         request.setHeader('content-type', fileType);
    //         request.setBodyAsBlob(blbObj);
    //         HttpResponse response=new HttpResponse();
    //         response=http.send(request);
    //         System.debug(response.getStatusCode());
    //         if(response.getStatusCode()==200) {
    //             return true;
    //         }
    //     } 

    //     catch (Exception e) {
    //         system.debug(e);
    //     }
    //     return false;   
    // }
    
    @AuraEnabled(cacheable=true)
    public static List<Object> getAllDownloadData(String row, string token){
        try {
            Http http  = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://www.googleapis.com/drive/v2/files');
            request.setHeader('Authorization', 'Bearer ' +token);
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            system.debug(response.getStatusCode());
            system.debug(response.getBody());
            Map<String, Object> driveFiles = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<object> data = (List<object>)driveFiles.get('items');
            return data;
        } 
        
        catch (Exception e) {
            throw new AuraHandledException(e.getmessage());
        }
    }
    

    @AuraEnabled
    public static String uploadFile(String type, String access_token, String fileName){
        try {
           /* Blob blbObj=EncodingUtil.base64Decode(file);
            Http http=new Http();
            HttpRequest request=new HttpRequest();
            request.setEndpoint('https://www.googleapis.com/upload/drive/v2/files?uploadType=media');
            request.setMethod('POST');
            request.setHeader('Authorization', 'Bearer '+access_token);
            request.setHeader('content-type', type);
            request.setBodyAsBlob(blbObj);
            HttpResponse response=new HttpResponse();
            response=http.send(request);
            System.debug(response.getStatusCode());
            if(response.getStatusCode()==200) {
                return true;
            }*/

            // String boundary = '----------9889464542212';
            // String delimiter = '\r\n--' + boundary + '\r\n';
            // String close_delim = '\r\n--' + boundary + '--';
            // String body = delimiter + 'Content-Type: application/json\r\n\r\n' + '{ "title" : "' + fileName + '",' + ' "mimeType" : "' + type + '" }' + delimiter + 'Content-Type: ' + type + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + file + close_delim;
            // Http http = new Http();
            // HttpRequest req = new HttpRequest();
            // req.setEndpoint('https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart');
            // req.setHeader('Authorization', 'Bearer ' + access_token);
            // req.setHeader('Content-Type', 'multipart/mixed; boundary="' + boundary + '"');
            // req.setHeader('Content-length', String.valueOf(body.length()));
            // req.setBody(body);
            // req.setMethod('POST');
            // req.setTimeout(60 * 1000);
            // HttpResponse resp = http.send(req);
            // file = null;
            // type = '';
            // fileName = '';
            String body ='{ "name" : "' + fileName + '",' + ' "mimeType" : "' + type + '"}';
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable');
            request.setMethod('POST');   
            request.setHeader('Authorization', 'Bearer '+access_token);
            request.setHeader('Content-Type', 'application/json; charset=UTF-8');
          //   request.setHeader('Content-length', String.valueOf(body.length()));
            // system.debug('body length 1st>>>>>>>'+ String.valueOf(body.length()));
            //request.setHeader('X-Upload-Content-Type',type);
            // request.setHeader('X-Upload-Content-Length',String.valueOf(fileSize));
            // system.debug('content length 1st>>>>>>>'+ String.valueOf(fileSize));
            // system.debug(Integer.valueOf(fileSize));
            request.setBody(body);
            HttpResponse response=http.send(request);
           system.debug('response ' + response.getBody());
           String locationUrl = response.getHeader('Location');
           system.debug('locationUrl>>>>>>>>>>>'+ locationUrl);
            if(response.getStatusCode()==200) {
             return locationUrl;}
             return 'null';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static Boolean uploadChunk(Integer fileSize, Integer start, String locationUrl, Integer chunkLength, String chunk ){
      //  system.debug('uploadeed '+ fileName);
      try {
        system.debug('upload chuk cal 111111111111111111111');
            Blob blb = EncodingUtil.base64Decode(chunk);
            Http httpp = new Http();
            HttpRequest req = new HttpRequest();
            req.setEndpoint(locationUrl);
            req.setMethod('PUT');
            req.setHeader('Content-Range', 'bytes '+start+'-'+chunkLength+'/'+(Integer.valueOf(fileSize)));
            system.debug('Content-Range'+ 'bytes '+Integer.valueOf(start)+'-'+(Integer.valueOf(chunkLength)-1)+'/'+(Integer.valueOf(fileSize)));
            req.setBodyAsBlob(blb);
            HttpResponse res = httpp.send(req);
            system.debug('2nd Response body >>>>>' + res.getBody());
            system.debug('2nd status code >>>>>' + res.getBody());
            if(res.getStatusCode() == 200){
                return true;
    } 
return false;
} catch (Exception e) {
        system.debug(e);
}
return false;
}
@AuraEnabled
public static boolean uploadChunkBlob(String location, Integer start, Integer endValue, Integer fileSize, String chunk, String accessToken){
    Boolean result = false;
    system.debug('location>>>>>>>>>>'+location);
    system.debug('start>>>>>>>>>>'+start);
    system.debug('endValue>>>>>>>>>>'+endValue);
    system.debug('fileSize>>>>>>>>>>'+fileSize);
    system.debug('chunk>>>>>>>>>>'+chunk);

    try {
        Blob myblb = EncodingUtil.base64Decode(chunk);
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(location);
        request.setMethod('PUT');
        request.setHeader('Content-Range', 'bytes ' + start + '-' + endValue + '/' + fileSize);    
        request.setBodyAsBlob(myblb);
        HttpResponse response = http.send(request);
        system.debug('Response code>>>>>>>>>>>>'+ response.getStatusCode());
        system.debug('Response body>>>>>>>>>>>>>'+ response.getBody());
        if(response.getStatusCode()==200){
            result = true;
        }
        else if(response.getStatusCode() == 404){
            throw new AuraException('Error!!');
        }
    } 
    catch (Exception e) {
        system.debug('error>>>>>>>'+ e.getMessage()+' in line>>>>>>>'+e.getLineNumber());
        }  
    return result;
    }

}