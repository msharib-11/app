({ 
    getFileDownloadUrl: function(fileId) {
        var action = component.get("c.getFileDownloadUrl");
        console.log('controller function');
        action.setParams({
            fileId: fileId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var fileUrl = response.getReturnValue();
                return fileUrl;
            } else {
                // Handle error
                console.log("Error fetching file download URL: " + response.getError());
                return '';
            }
        });
        $A.enqueueAction(action);
    },

    downloadFile: function(fileUrl) {
        var downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.target = '_blank';
        downloadLink.download = '';
        downloadLink.click();
    },

    // viewFile: function(viewId) {
    //     var action = component.get("c.getFileViewUrl");
    //     action.setParams({
    //         viewId: viewId
    //     });
    //     action.setCallback(this, function(response) {
    //         console.log("///////////");
    //         var state = response.getState();
    //         if (state === "SUCCESS") {
    //             console.log("State>>>>>>"+ state);
    //             var viewUrl = response.getReturnValue();
    //             window.open(viewUrl, '_blank');
    //         } else {
    //             // Handle error
    //             console.log("Error fetching file view URL: " + response.getError());
    //         }
    //     });
    //     $A.enqueueAction(action);
    // }
    

    uploadFileToGoogleDrive: function(fileToUpload, fileName, callback) {
        var reader = new FileReader();
        reader.onloadend = function() {
            var fileData = reader.result;
            
            // Make API call to upload the file to Google Drive
            // Replace this code with your actual Google Drive API logic
            
            // Example code:
            // Assuming you have already set up the necessary authentication and obtained the required access token
            
            var req = new XMLHttpRequest();
            req.open("POST", "https://www.googleapis.com/upload/drive/v3/files?uploadType=media");
            req.setRequestHeader("Authorization", "Bearer ya29.a0AbVbY6MoCkpkWMT3T17pygjMMlMJvl0ZsE5Plg3aiGTCKVvM4zPxXbZiOeig6gRQA_g0Q4oV3WaTfqy7ebQEa5gFHwbNka0cd4E3QELUJ_bMzmyqExhqUeiPzqSok6acQKh7Z76qMC-jYRHLBGWPXZdL0adeEgaCgYKAYASAQ4SFQFWKvPlA2D2OvswXFAwmWTRQNUprg0165");
            req
        }
    }
    
    
})