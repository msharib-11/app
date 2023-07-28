@RestResource(urlMapping='/Cases/*')
global with sharing class CaseManager {
	@HttpGet
    global static Case getCaseById() {
        RestRequest request = RestContext.request;
        String caseId = request.requestURI.substring(
          request.requestURI.lastIndexOf('/')+1);
        Case result =  [SELECT CaseNumber,Subject,Status,Origin,Priority
                        FROM Case
                        WHERE Id = :caseId];
        system.debug(result);
        return result;
    }
}