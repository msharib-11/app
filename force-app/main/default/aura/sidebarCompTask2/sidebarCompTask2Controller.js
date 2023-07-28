({
    handleClick : function(component, event, helper){
        helper.helperMethod(component, event, helper);
    },

    handleMessage : function(component, event, helper){
            if (event != null && event.getParams() != null) {
            let params = event.getParams().buttonvalue;
            console.log("Params>>>>>>>>",params);
            
            if(params == "yes"){
                component.set("v.setselectedItem", "userInfo");
                helper.helperMethod(component, event, helper);
            }
        }
    }
})