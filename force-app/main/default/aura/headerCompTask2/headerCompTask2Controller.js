({
    doinit : function(component, event, helper) {
        var action = component.get("c.getUserDetails");
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var userItems = response.getReturnValue();
                component.set("v.userDetails", userItems);
                console.log('usr>>>>>>>>>>>>>>>>',userItems);
            }
            else if(state === "INCOMPLETE"){

            }
            else if(state === "ERROR"){
                var error = response.getError();
                if(error){
                    console.log(error);
                }
            }
        })
        $A.enqueueAction(action);
    },

    toggleIcon : function(component, event, helper){
        component.set('v.show', component.get('v.show')?false:true);
    },

    handleClick : function(component, event, helper){
        var passval = 'yes';
        var payload = {
            buttonvalue : passval
        };
        console.log("payload>>>>>>>>>", payload);
        component.find("samplemessage").publish(payload);
        component.set('v.show', false);
    }
})