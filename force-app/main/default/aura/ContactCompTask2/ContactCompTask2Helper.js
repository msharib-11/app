({
    // fetchConHelper : function(component, event, helper) {
    //     // {label: 'Status', fieldName: 'ActiveCon__c', type: 'text'}
    //     var actionsbuttons = [
    //         { label: 'View', name: 'view'}, 
    //         { label: 'Edit', name: 'edit'}, 
    //         { label: 'Delete', name: 'delete'}
    //     ];
    //     component.set('v.mycolumns', [
    //             {label: 'Last Name', fieldName: 'LastName', type: 'text', sortable: true},
    //             {label: 'Email', fieldName: 'Email', type: 'text', sortable: true},
    //             {label: 'Phone', fieldName: 'Phone', type: 'Phone', sortable: true},
    //             {label: 'Status', fieldName: 'ActiveCon__c', sortable: "true"},
    //             {
    //                 type: 'action',
    //                 typeAttributes: {
    //                     rowActions: actionsbuttons,
    //                     menuAlignment: 'right',
    //                 }
    //             }
    //         ]);
        
    //         var action = component.get("c.getContacts");
    //         action.setParams({
    //     });
    //     action.setCallback(this, function(response){
    //         var state = response.getState();
    //         if (state === "SUCCESS") {
                // component.set('v.records', response.getReturnValue());
                // // this.totalRecords = data.length; 
                // component.set('v.totalRecords', response.getReturnValue().length);
                // component.set('v.pageNumber', 1);
                // var pagesizeoption = component.get('v.pageSizeOptions[0]')
                // component.set('v.pageSize', pagesizeoption);
                // this.paginationHelper(component);
    //         }
    //     });
    //     $A.enqueueAction(action);
    // },

    sortData: function (component, fieldName, sortDirection) {
        var fname = fieldName;
        var data = component.get("v.ContList");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortByfield(fieldName, reverse))
        component.set("v.ContList", data);
    },
    
    sortByfield: function (field, reverse) {
        var key = function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },

    deleteRecord : function(component, event, helper) {

        var rowId = event.getParam('row').Id;   
        // console.log('++++Delet++++++');     
        var action = component.get("c.deleteContact");
        // console.log('______Dele______')
        action.setParams({
            "conId": rowId
        });
        action.setCallback(this, function(response) {
           
            if (response.getState() === "SUCCESS" ) {
                // var rows = component.get('v.ContList');
                // var rowIndex = rows.indexOf(accountRec);
                // rows.splice(rowIndex, 1);
                // component.set('v.ContList', rows); 
                helper.fetchDynamicQueryResults(component, event, helper);
            }
        });
        $A.enqueueAction(action);
    },

    paginationHelper: function(component) {
        var recordsToDisplay = [];
        var totalRecords = component.get("v.totalRecords");
        var pageSize = component.get("v.pageSize");
        var totalPages = Math.ceil(totalRecords / pageSize);
        var pageNumber = component.get("v.pageNumber");

        if (pageNumber <= 1) {
            pageNumber = 1;
        } else if (pageNumber >= totalPages) {
            pageNumber = totalPages;
        }

        for (var i = (pageNumber - 1) * pageSize; i < pageNumber * pageSize; i++) {
            if (i === totalRecords) {
                break;
            }
            recordsToDisplay.push(component.get("v.records")[i]);
        }

        component.set("v.ContList", recordsToDisplay);
        component.set("v.totalPages", totalPages);
        component.set("v.pageNumber", pageNumber);
    },




    fetchDynamicQueryResults: function(component, event, helper) {
        var actionsbuttons = [
            { label: 'View', name: 'view'}, 
            { label: 'Edit', name: 'edit'}, 
            { label: 'Delete', name: 'delete'}
        ];
        var cols = [];
        var action1 =component.get("c.getFieldLableAndFieldAPI");
        
        action1.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                let field = response.getReturnValue();
                let fieldSet = JSON.parse(field);
                for (let index = 0; index < fieldSet.length; index++) {
                    cols.push({label : Object.keys(fieldSet[index])[0], fieldName : Object.values(fieldSet[index])[0], sortable: true});
                }
                cols.push({
                    type: 'action',
                    typeAttributes: {
                        rowActions: actionsbuttons,
                        menuAlignment: 'right',
                    }
                })
            }
            component.set('v.columns', cols)
        })
        $A.enqueueAction(action1);
        
        var action = component.get("c.executeQuery");
        action.setParams({
            objectName: 'Contact',
            fieldSetName: 'task3Fieldset'
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // var queryResults = response.getReturnValue();
                // console.log("result",queryResults);
                // component.set("v.ContList", queryResults);

                component.set('v.records', response.getReturnValue());
                // this.totalRecords = data.length; 
                component.set('v.totalRecords', response.getReturnValue().length);
                component.set('v.pageNumber', 1);
                var pagesizeoption = component.get('v.pageSizeOptions[0]')
                component.set('v.pageSize', pagesizeoption);
                this.paginationHelper(component);

            }
        });
        $A.enqueueAction(action);
    },















    // sendingEmail : function(component, event, helper){
    //     var rId = component.get('v.recId');
    //     var action = component.get("c.sendEmail");
    //     action.setParams({
    //         recordId : rId
    // });
    // action.setCallback(this, function(response){
    //     var state = response.getState();
    //     if (state === "SUCCESS") {
    //         // component.set("v.ContList", response.getReturnValue());
    //         console.log("Email sent");
    //     }
    // });
    // $A.enqueueAction(action);
    // }

})