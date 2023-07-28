({
    doInit : function(component, event, handler) {
        $A.createComponent(
            "c:childCompTask4",
            {
                "message": "Hello I am value from parent"
            },
            function(comp, status, errorMessage){
                if (status === "SUCCESS") {
                    var body = component.get("v.body");
                    body.push(comp);
                    component.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    getEvents : function(component, event, helper) {
        var evtValue = event.getParam("childValue");
        component.set("v.childValue",evtValue);
	},

    sendValuetoChild : function(component, event, helper) {
        var appEvent = $A.get("e.c:childParentEventTask4");               
        appEvent.setParams({"parentValue":"Hello I am value from parent"});                                               
        appEvent.fire(); 
    }

})