@isTest
public class GoogleDriveSalesforceIntegrationTest {
    @testSetup
    public static void stup(){
        SalesforceGdriveIntegration__c gdi = new SalesforceGdriveIntegration__c();
        gdi.ClientId__c = '441176579448-na59cb9h4rjqckcjhrqqm3c8mahcvl7h.apps.googleusercontent.com';
        gdi.ClientSecret__c = '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';
        gdi.RedirectUri__c = 'https://cloudanalogy-5e5-dev-ed.develop.lightning.force.com/c/driveIntegration1.app';
        insert gdi;
        String key = gdi.ClientId__c;
        String uri = gdi.RedirectUri__c;
        String secret = gdi.ClientSecret__c;
        String code = 'Abcd';
        
    }
    
    @isTest 
    public static void getAllData_Test(){
        Test.startTest();
        string str = GoogleDriveSalesforceIntegration.getAllViewData('token', 'row');
        Test.setMock(HttpCalloutMock.class, new MockCallOut());
        String authUri = GoogleDriveSalesforceIntegration.createAuthURL();
        string expectedAuthUri = 'https://accounts.google.com/o/oauth2/auth?client_id=441176579448-na59cb9h4rjqckcjhrqqm3c8mahcvl7h.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/drive&redirect_uri=https%3A%2F%2Fcloudanalogy-5e5-dev-ed.develop.lightning.force.com%2Fc%2FdriveIntegration1.app&access_type=offline';
        System.assertEquals(expectedAuthUri, authUri,'Error');
        String token =  GoogleDriveSalesforceIntegration.getAccessToken('code');
        system.assertEquals('Hello', token, 'err');
        List<Object> result = GoogleDriveSalesforceIntegration.getAllData(token);
        system.AssertEquals(1, result.size());
        Test.stopTest();
    }
    
    @isTest 
	static void testPostCallout() {
    Test.startTest();
    Test.setMock(HttpCalloutMock.class, new MockCallOut()); 
    Boolean response = GoogleDriveSalesforceIntegration.uploadFileContent('file', 'access_token', 'fileName', 'type');
    System.assertEquals(true, response, 'error');
    Test.stopTest();
	}
    
    @isTest
    static void getDownloadData(){
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MockCallOutDownload());
        List<Object> ob = GoogleDriveSalesforceIntegration.getAllDownloadData('row', 'token');
        system.assertEquals(1, ob.size(), 'error');
        Test.stopTest();
    }
}