public with sharing class SalesforceGdriveIntegration {
    @AuraEnabled
    public static List<Object> getGoogleDriveFiles() {
        List<GoogleDriveFile> files = new List<GoogleDriveFile>();
        List<Object> filesList = new List<Object>();
                
        // Make API call to retrieve files from Google Drive
        // Replace this code with your actual Google Drive API logic
                
        // Example code:
        // Assuming you have already set up the necessary authentication and obtained the required access token
                
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.googleapis.com/drive/v3/files');
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ya29.a0AbVbY6MoCkpkWMT3T17pygjMMlMJvl0ZsE5Plg3aiGTCKVvM4zPxXbZiOeig6gRQA_g0Q4oV3WaTfqy7ebQEa5gFHwbNka0cd4E3QELUJ_bMzmyqExhqUeiPzqSok6acQKh7Z76qMC-jYRHLBGWPXZdL0adeEgaCgYKAYASAQ4SFQFWKvPlA2D2OvswXFAwmWTRQNUprg0165');
                
        HttpResponse res = new Http().send(req);
        if (res.getStatusCode() == 200) {
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            filesList = (List<Object>) responseMap.get('files');
                    
            // for (Object obj : filesList) {
            //     Map<String, Object> fileMap = (Map<String, Object>) obj;
            //     // String fileId = (String) fileMap.get('id');
            //     // String fileName = (String) fileMap.get('name');
                        
            //     files.add(new GoogleDriveFile(fileId, fileName));
            // }
        } else {
            // Handle error
            System.debug('Error fetching Google Drive files: ' + res.getBody());
        }
                
        return filesList;
    }
        
    @AuraEnabled
    public static String getFileDownloadUrl(String fileId) {
        String downloadUrl = '';
            
        // Make API call to retrieve file download URL from Google Drive
        // Replace this code with your actual Google Drive API logic
            
        // Example code:
        // Assuming you have already set up the necessary authentication and obtained the required access token
            
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media');
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ya29.a0AbVbY6MoCkpkWMT3T17pygjMMlMJvl0ZsE5Plg3aiGTCKVvM4zPxXbZiOeig6gRQA_g0Q4oV3WaTfqy7ebQEa5gFHwbNka0cd4E3QELUJ_bMzmyqExhqUeiPzqSok6acQKh7Z76qMC-jYRHLBGWPXZdL0adeEgaCgYKAYASAQ4SFQFWKvPlA2D2OvswXFAwmWTRQNUprg0165');
            
        HttpResponse res = new Http().send(req);
        if (res.getStatusCode() == 200) {
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            downloadUrl = (String) responseMap.get('webContentLink');
        } else {
            // Handle error
            System.debug('Error fetching file download URL: ' + res.getBody());
        }
            
        return downloadUrl;
    }
        
    public class GoogleDriveFile {
        @AuraEnabled
        public String id { get; set; }
        @AuraEnabled
        public String name { get; set; }
            
        public GoogleDriveFile(String id, String name) {
            this.id = id;
            this.name = name;
        }
    }
    
    @AuraEnabled
    public static String getFileViewUrl(String viewId) {
        // Make API call to retrieve file view URL from Google Drive
        // Replace this code with your actual Google Drive API logic
        // Example code:
        // Assuming you have already set up the necessary authentication and obtained the required access token
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.googleapis.com/drive/v3/files/' + viewId);
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ya29.a0AbVbY6MoCkpkWMT3T17pygjMMlMJvl0ZsE5Plg3aiGTCKVvM4zPxXbZiOeig6gRQA_g0Q4oV3WaTfqy7ebQEa5gFHwbNka0cd4E3QELUJ_bMzmyqExhqUeiPzqSok6acQKh7Z76qMC-jYRHLBGWPXZdL0adeEgaCgYKAYASAQ4SFQFWKvPlA2D2OvswXFAwmWTRQNUprg0165');
        HttpResponse res = new Http().send(req);
        if (res.getStatusCode() == 200) {
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            String viewUrl = (String) responseMap.get('webViewLink');
            return viewUrl;
        } else {
                // Handle error
            System.debug('Error fetching file view URL: ' + res.getBody());
            return null;
        }
    }
}