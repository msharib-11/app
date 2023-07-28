({
    doinit : function(component, event, helper) {
        helper.helperMethod(component, event, helper);
    },

    handleEditUser : function(component, event, helper){
        component.set('v.editStatus', true);
    },

    handleCancelUserEdit : function(component, event, helper){
        component.set('v.editStatus', false);
    },

    handleUpdateUser : function(component, event, helper){
        component.set('v.editStatus', false);
    },

    handleSuccess : function(component, event, helper){
        console.log("successfully edited");
        component.set('v.editStatus', false);
    }
})