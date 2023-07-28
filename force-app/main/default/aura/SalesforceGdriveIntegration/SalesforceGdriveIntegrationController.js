({
    
    fetchGoogleDriveFiles: function(component, event, helper) {
        var action = component.get("c.getGoogleDriveFiles");
        action.setCallback(this, function(response) {
            console.log(">>>>>>>>>");
            var state = response.getState();
            if (state === "SUCCESS") {
                var files = response.getReturnValue();
                
                // Modify files data to include download URL
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    file.downloadUrl = file.downloadUrl;
                }
                
                component.set("v.files", files);
                
                var columns = [
                    { label: 'File Name', fieldName: 'name', type: 'text' },
                    {label: 'File type', fieldName: 'mimeType', type: 'text'},
                    { label: 'Download', type: 'button', typeAttributes: { label: 'Download', name: 'Download', title: 'Click to download', variant: 'base' }, initialWidth: 100 },
                    { label: 'View', type: 'button', typeAttributes: { label: 'View', name: 'view', title: 'Click to view', variant: 'base' }, initialWidth: 100 }
                ];
                component.set("v.columns", columns);
            } else {
                // Handle error
                console.log("Error"+ error);
                console.log("Error fetching Google Drive files: " + response.getError());
                
            }
        });
        $A.enqueueAction(action);
    },

    
        handleRowAction: function(component, event, helper) {
            console.log(">>>>>>>>>>>>>>>>>");
            var action = event.getParam('action');
            var row = event.getParam('row');
            
            if (action.name === 'Download') {
                console.log("Action name"+ action.name);
                var fileId = row.id;
                var action = component.get("c.getFileDownloadUrl");
                action.setParams({
                    fileId: fileId
                });
                
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        console.log("State"+ state);
                        var fileUrl = response.getReturnValue();
                        console.log("fileUrl>>>>" + fileUrl);
                        helper.downloadFile(fileUrl);
                        console.log("???????????");
                    } else {
                        // Handle error
                        console.log("Error fetching file download URL: " + response.getError());
                    }

                });
                
                $A.enqueueAction(action);
            }

            else if (action.name === 'view') {
                console.log("Viewwwwwwwwwww");
                
                var viewId = row.id;
                console.log("fileID>>>>>>>"+ viewId);
                var fileUrl = 'https://drive.google.com/file/d/' + viewId + '/view';
                window.open(fileUrl, '_blank');
            
        }
    },


    
    

    handleFileUpload: function(component, event, helper) {
    var uploadedFiles = event.getParam("files");
    if (uploadedFiles && uploadedFiles.length > 0) {
    var file = uploadedFiles[0];
    component.set("v.fileToUpload", file.contentDocumentId);
    component.set("v.fileName", file.name);
}
},


uploadFile: function(component, event, helper) {
var fileToUpload = component.get("v.fileToUpload");
var fileName = component.get("v.fileName");

// Call the helper function to upload the file to Google Drive
helper.uploadFileToGoogleDrive(fileToUpload, fileName, function(response) {
    if (response.success) {
        // File upload successful, refresh the file list
        helper.fetchGoogleDriveFiles(component);
        
        // Reset file upload variables
        component.set("v.fileToUpload", null);
        component.set("v.fileName", "");
    } else {
        // File upload failed, handle the error
        console.log("Error uploading file: " + response.error);
    }
});
},



// downloadFile: function(component, event, helper) {
//     var fileId = event.currentTarget.dataset.fileId;
//     var action = component.get("c.getFileDownloadUrl");
//     console.log(">>>>>>>>>>>>>>>>..");
//     action.setParams({
//         fileId: fileId
        
//     });
//     console.log("FiledIDDDDDDD" + fileId);
//     action.setCallback(this, function(response) {
//         var state = response.getState();
//         if (state === "SUCCESS") {
//             console.log("State" + state);
//             var fileUrl = response.getReturnValue();
//             helper.downloadFile(fileUrl);
//         } else {
//             // Handle error
//             console.log("Error fetching file download URL: " + response.getError());
//         }
//     });
//     $A.enqueueAction(action);
// }
})

//abcdefghijklmnopqrs
//abcdf