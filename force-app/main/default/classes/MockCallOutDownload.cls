@isTest
global class MockCallOutDownload  implements HttpCalloutMock{
    global HTTPResponse respond(HTTPRequest req){
    	HTTPResponse mockRes = new HTTPResponse();
        mockRes.setHeader('Content-Type', 'application/json');
        mockRes.setStatusCode(200);
        //mockRes.setBody('{items: []}');
        mockRes.setBody('{"kind":"drive#fileList","items":[{"displayName":"Noida admin","kind":"drive#user","isauthenticateduser":false,"permissionid":"16140448444077005196","emailaddress":"admin.noida@cloudanalogy.com","picture":{"url":"https://lh3.googleusercontent.com/a-/AD_cMMQvfc65maEk8Vv_iYX71gAOwNZ6FKx9INgq-HR8kkDDOQ=s64"}}]}');
        return mockRes;
	}   
}