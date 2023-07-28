({
    fetchCon : function(component, event, helper) {
        component.set('v.pageNumber',1);
        component.set('v.pageSize',10);
        component.set('v.isLoaded',true);
        helper.fetchDynamicQueryResults(component, event, helper);
        // helper.fetchConHelper(component, event, helper);
    },

    searchKeyChange: function(component, event) {
        var searchKey = component.find("searchKey").get("v.value");
        console.log('searchKey:::::'+searchKey);
        var action = component.get("c.findByName");
        action.setParams({
            objectName: 'Contact',
            fieldSetName: 'task3Fieldset',
            "searchKey": searchKey
        });
        action.setCallback(this, function(response) {
            var val = response.getReturnValue();
            component.set("v.ContList", val);
        });
        $A.enqueueAction(action);
    },

    sortColumn : function (component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    },

    handleRowAction : function(component, event, helper){
        var action = event.getParam('action');
        var row = event.getParam('row');

        // console.log(row.Id);
        console.log(action.name);

        switch (action.name) {
            case 'view':
                // console.log("test view button");
                // var view = component.get('v.viewAction');
                // console.log(view);

                component.set('v.recId', row.Id);
                component.set('v.viewAction', true);
                break;

            case 'edit':
                component.set('v.recId', row.Id);    
                component.set('v.editAction', true);
                break;

            case 'delete':
                helper.deleteRecord(component, event, helper);
                // helper.fetchConHelper(component, event, helper);
                break;
            default:
        }
    }, 

    cancelView : function(component, event, helper){
        component.set('v.viewAction', false);
    },

    cancelEdit : function(component, event, helper){
        component.set('v.editAction', false);
    }, 

    handleEditSuccess : function(component, event, helper){
        console.log("Successfully  edited");
        component.set('v.editAction', false);
        helper.fetchDynamicQueryResults(component, event, helper);
        var rId = component.get('v.recId');
        var action = component.get("c.sendEmail");
        action.setParams({
            recordId : rId,
            createdId : null
    });
    action.setCallback(this, function(response){
        var state = response.getState();
        if (state === "SUCCESS") {
            // component.set("v.ContList", response.getReturnValue());
            console.log("Email sent");
        }
    });
    $A.enqueueAction(action);
    },

    handleClickNewCon : function(component, event, helper){
        component.set('v.CreateNewContact', true);
    },

    newConCancel : function(component, event, helper){
        component.set('v.CreateNewContact', false);
    },

    handleCreateSuccess : function(component, event, helper){
        console.log("Successfully  created");
        var conId = event.getParams().response.id;
        component.set('v.CreateNewContact', false);
        helper.fetchDynamicQueryResults(component, event, helper);
        
        var action = component.get("c.sendEmail");
        action.setParams({
            recordId : null,
            createdId : conId
    });
    action.setCallback(this, function(response){
        var state = response.getState();
        if (state === "SUCCESS") {
            // component.set("v.ContList", response.getReturnValue());
            console.log("Email sent");
        }
    });
    $A.enqueueAction(action);
    },

    tabSelected : function(component, event, helper){
        var getStatus = event.getParam('id');   
        component.set('v.selTabId', getStatus);
        // console.log(component.get('v.selTabId'))
        var action = component.get("c.getContactStatus");
        action.setParams({
            objectName: 'Contact',
            fieldSetName: 'task3Fieldset',
            "activeVal" : getStatus
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set('v.records', response.getReturnValue());
                component.set('v.totalRecords', response.getReturnValue().length);
                component.set('v.pageNumber', 1);
                var pagesizeoption = component.get('v.pageSizeOptions[0]')
                component.set('v.pageSize', pagesizeoption);
                helper.paginationHelper(component) 
            }
        });
        $A.enqueueAction(action);
    },

    getBDisableFirst: function(component, event, helper) {
        return component.get("v.pageNumber") === 1;
    },
    
    handleRecordsPerPage: function(component, event, helper) {
        // var pageSize = event.getParam().value;
        var pageSize = event.target.value;
        component.set("v.pageSize", pageSize);
        helper.paginationHelper(component);
    },
    
    previousPage: function(component, event, helper) {
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber - 1);
        helper.paginationHelper(component);
    },
    
    nextPage: function(component, event, helper) {
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber + 1);
        helper.paginationHelper(component);
    },
    
    firstPage: function(component, event, helper) {
        component.set("v.pageNumber", 1);
        helper.paginationHelper(component);
    },
    
    lastPage: function(component, event, helper) {
        var totalPages = component.get("v.totalPages");
        component.set("v.pageNumber", totalPages);
        helper.paginationHelper(component);
    }
})