({
    helperMethod : function(component, event, helper) {
        var selectitem = component.get("v.setselectedItem");
        var paraEvent = component.getEvent("sideEvent");
        console.log(selectitem)
        paraEvent.setParams({
            eventVal : selectitem
        })
        paraEvent.fire();
    }
})