public class AnimalsCallouts {
    public static HttpResponse makeGetCallout(){
        Http http = new Http();
        httpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200){
            map<String, Object> result = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
            List<Object> animals = (List<Object>)result.get('animals');
            system.debug('Received animals');
            for(Object animal: animals){
                system.debug(animal);
            }
        }
        return response;
    }
    
    public static HttpResponse makePostCallout(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setBody('{"name": "Dog"}');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() != 201){
            system.debug('The req Returned' + response.getStatusCode() + ' ' + response.getStatus());
        }
        else{
            system.debug(response.getBody());
        }
        return response;
    }
}