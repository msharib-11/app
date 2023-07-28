public class CreateResume {
   @AuraEnabled
    public static String createResumeMethod(String name,Integer expertise,String link,String parentId){
        String filesContent = 'Name:'+name+'\n'+'Expertise:'+expertise+'\n'+'Resume Link:'+link;
        ContentVersion cont = new ContentVersion();
        cont.Title = name;
        cont.PathOnClient =  name;
        cont.VersionData = Blob.valueOf(filesContent);
        insert cont;
        ContentVersion cv = [SELECT ID ,Title, ContentDocumentID from ContentVersion where ID= :cont.id];
        List<ContentDistribution> cdList = [select ID,DistributionPublicUrl ,ContentDownloadURL  from ContentDistribution where ContentVersionId= :cv.Id and ContentDocumentId=:cv.ContentDocumentId ];
                    if(cdList.size()>0){
                      System.debug(cdList.get(0).ContentDownloadUrl);
                    }else{
                        ContentDistribution newItem = new ContentDistribution();
                        newItem.Name = cv.Title;
                        newItem.ContentVersionId = cv.Id;
                        newItem.PreferencesAllowViewInBrowser= true;
                        newItem.PreferencesLinkLatestVersion=true;
                        newItem.PreferencesNotifyOnVisit=false;
                        newItem.PreferencesPasswordRequired=false;
                        newItem.PreferencesAllowOriginalDownload= true;
                        Insert NewItem;
                        
                        newItem = [SELECT ID,DistributionPublicUrl, ContentDownloadURL  from  ContentDistribution               where ID= :newItem.Id];
                     
                        System.debug(newItem.ContentDownloadURL);
                        return newItem.ContentDownloadURL;
                    }
        
        
      return 'null';
    }
}