public class MockClass implements HttpCalloutMock {
	private HttpResponse mockResponse;

    public MockClass(HttpResponse mockResponse) {
    	this.mockResponse = mockResponse;
    }

    public HttpResponse respond(HttpRequest req) {
    	return mockResponse;
    }
}