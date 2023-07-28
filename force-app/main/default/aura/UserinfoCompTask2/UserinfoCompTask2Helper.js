({
    helperMethod : function(component, event, helper) {
        var action = component.get("c.getUserDetails");
        action.setCallback(this, function(responce){
            var state = responce.getState();
            if(state === "SUCCESS"){
                var userDetails = responce.getReturnValue();
                component.set("v.userInfo", userDetails);
                console.log(userDetails)
            }
            else if(state === "INCOMPLETE"){

            }
            else if (error){
                console.log(error);
            }
        })
        $A.enqueueAction(action);
    }
})