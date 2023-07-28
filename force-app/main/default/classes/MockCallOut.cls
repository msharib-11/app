@isTest
global class MockCallOut implements HttpCalloutMock{
    global HTTPResponse respond(HTTPRequest req){
        if('https://accounts.google.com/o/oauth2/token'== req.getEndpoint()){
        HTTPResponse mockRes = new HTTPResponse();
        mockRes.setStatusCode(200);
        //mockRes.setBody('{items: []}');
        mockRes.setBody('{"access_token": "Hello"}');
        return mockRes;
        }
        
        else if('https://www.googleapis.com/drive/v2/files' == req.getEndpoint()){
        HTTPResponse mockRes = new HTTPResponse();
        mockRes.setStatusCode(200);
        mockRes.setBody('{ "kind": "drive#fileList", "etag": "d6GIHlTpQwtvoLNrs2Inv3pHMak", "selfLink": "https://www.googleapis.com/drive/v2/files", "incompleteSearch": false, "items": [ { "id": "1v7MCkGqyj_QmDJg_qfkw47ct8ChiTwJ0n4guI2z8dWw", "title": "CA Noida Lunch & Dinner Sheet ", "labels": { "viewed": true, "restricted": true, "starred": false, "hidden": false, "trashed": false }, "explicitlyTrashed": false, "createdDate": "2022-05-26T06:30:03.404Z", "modifiedDate": "2023-07-05T14:26:56.095Z", "modifiedByMeDate": "2023-02-15T09:11:38.835Z", "lastViewedByMeDate": "2023-07-03T14:41:33.240Z", "markedViewedByMeDate": "1970-01-01T00:00:00.000Z", "sharedWithMeDate": "2023-02-15T08:43:03.191Z", "quotaBytesUsed": "15013459", "version": "15463", "capabilities": { "canEdit": true, "canCopy": true } } ] }');
        mockRes.setHeader('Content-Type', 'application/json');
        return mockRes;
        }
        
        else if('https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart' == req.getEndpoint()){
        HTTPResponse mockRes = new HTTPResponse();
        mockRes.setStatusCode(200);
        //mockRes.setBody('{items: []}');
        mockRes.setBody('{"access_token": "Hello"}');
        mockRes.setHeader('Content-Type', 'application/json');
        return mockRes;
        }
        
        HTTPResponse mockRes = new HTTPResponse();
        mockRes.setStatusCode(200);
        return mockRes;
    }	
}