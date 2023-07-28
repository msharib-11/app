({
	doinit : function(component, event, helper) {
		component.set("v.var3","This value is from comp controller")
	},
 
    doinit1 : function(component, event, helper) {
	var data = {
            'Name' : 'Mohd Sharib',
            'Age' : 22
        }
    component.set("v.jsObject",data)
	}
}

)