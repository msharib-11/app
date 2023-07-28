({
    handleValue : function(component, event, helper) {
        var pageValue = event.getParam("eventVal");
        console.log(">>>>>>>>>>>>>>>",pageValue);
        if(pageValue == 'ConInfo'){
            component.set('v.contact', true);
            component.set('v.user', false);
        }
        else if(pageValue == 'userInfo'){
            component.set('v.contact', false);
            component.set('v.user', true);
        }
    },

    sendValue : function(component, event, helper) {
        var appEvent = $A.get("e.c:childParentEventTask4");               
        appEvent.setParams({"childValue":"Hello I am value from child"});                                               
        appEvent.fire(); 
    },

    getEvents1 : function(component, event, helper) {
        var evtValue = event.getParam("parentValue");
        component.set("v.parentValue",evtValue);
	},
})