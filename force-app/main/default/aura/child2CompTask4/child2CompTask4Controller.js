({
    EventCompFire : function(component, event, helper) {
        var evt = component.getEvent("parentChildEvent");
        evt.setparams({
            "message" : "value comes from child"
        })
        evt.fire();
    }
})