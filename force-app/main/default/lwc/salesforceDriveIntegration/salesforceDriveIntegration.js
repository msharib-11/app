import { LightningElement, track, wire, api} from 'lwc';
import authUrl from '@salesforce/apex/GoogleDriveSalesforceIntegration.createAuthURL'
import getAccessToken from '@salesforce/apex/GoogleDriveSalesforceIntegration.getAccessToken'
import getData from '@salesforce/apex/GoogleDriveSalesforceIntegration.getAllData'
import getView from '@salesforce/apex/GoogleDriveSalesforceIntegration.getAllViewData'
// import getAttId from '@salesforce/apex/GoogleDriveSalesforceIntegration.uploadFileContent'
import uploadFile from '@salesforce/apex/GoogleDriveSalesforceIntegration.uploadFile'
import uploadCh from '@salesforce/apex/GoogleDriveSalesforceIntegration.uploadChunk'
import uploadBlob from '@salesforce/apex/GoogleDriveSalesforceIntegration.uploadChunkBlob'

// import getAllDownloadData from '@salesforce/apex/GoogleDriveSalesforceIntegration.getAllDownloadData'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'


// import { loadScript } from 'lightning/platformResourceLoader';
// import GOOGLE_DRIVE_API from '@salesforce/resourceUrl/GoogleDriveAPI'; // Replace with the actual resource URL
// // import uploadFileToDrive from '@salesforce/apex/GoogleDriveUploaderController.uploadFileToDrive';


export default class GDriveIntegration extends LightningElement {
  @track getFiles;
  @track getError;
  @track pageData;
  @track pageError;
  @track codeForToken;
  @track token;
  @track uploadedFile;
  @track fileName;
  @track fileDetails;
  @track fileContent;
  @track cvId;
  @track record;
  @track afterAuthorization = false;
  @track beforeAuthorization = true;
  @track listView = true;
  @track gridView = false;
  @track progress;
  @track file;
 

  // Pagination  
  @track pageSizeOptions = [5, 10, 25, 50, 75, 100];
  @track records = [];
  @track totalRecords = 0;
  @track pageSize; 
  @track totalPages;
  @track pageNumber = 1;
  @track recordsToDisplay = [];

  // @track fileReader;
  // @track fileContents;
  // @track content;
  columns=[
    {label:'Name',fieldName:'title'},
    {label:'Type',fieldName:'mimeType'},
    {
      type: "button", label: 'View', initialWidth: 100, typeAttributes: {
        label: 'View',
        name: 'View',
        title: 'View',
        disabled: false,
        value: 'view',
        iconPosition: 'left',
        // iconName: 'utility:preview',
        variant:'Brand'
      }
    },
      {
        type: "button", label: 'Download Link', initialWidth: 100, typeAttributes: {
            label: 'Download',
            name: 'Download',
            title: 'Download',
            disabled: false,
            value: 'download',
            iconPosition: 'left',
            // iconName: 'utility:download',
            variant:'Brand'
        },
      }
  ]
  @track gDriveLogo=true;
  @track dataTable=false;
    handleClick(){
        authUrl()
        .then(result=>{
          console.log(result);
          window.location.href = result;
        })
        .catch(error=>{
          console.log('Error');
        })
        
    }
    @wire(getData,{token:'$token'})
    wiredData({data,error}){
      if(data){
        console.log('filesdata');
         this.getFiles= data;
         this.getError= undefined;
         this.records = data;
         this.totalRecords = data.length;
         this.pageSize = this.pageSizeOptions[0];
         this.paginationHelper()
         this.isLoading = false;
      }
      else if(error){
        this.getFiles=undefined;
        this.getError=error;
      }
    }

    
    async connectedCallback() {
      
      const location = window.location.href;
      console.log("location>>>>>>>", location);
       this.codeForToken=location.substring(location.indexOf('?code=')+6,location.indexOf('&scope'));
        console.log("code>>>>>>.",this.codeForToken);
            getAccessToken({code:this.codeForToken})
            .then(result=>{
              console.log(result);
              this.token=result;
              this.isLoading = true;
              if(this.token){
                this.beforeAuthorization = false;
                this.afterAuthorization = true;
              }
              else {
                this.beforeAuthorization = true;
                this.afterAuthorization = false;
              }

            })
            .catch(error=>{
              console.log(error);
            })

          
        }
        get acceptedFormats() {
          return ['.pdf', '.png'];
      }

    //   handleUploadFinished(event){
    //   const files = event.detail.files;
    //   const file = event.target.files[0];
    //   let fileName=files[0].name;
    //   let fileType = files[0].type;

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //     const contents = reader.result;
    //     console.log("🚀  file: sfassProject5Controller.js:31  btoa(contents):", btoa(contents));
    //     getAttId({fileContent: btoa(contents),token:this.token,fileName:fileName,fileType:fileType})
    //     .then(result=>{
    //       console.log('successfully uploaded');
    //       window.location.reload(1);
    //     })
    //     .catch(error=>{
    //       console.log('ln ::: 106' + JSON.stringify(error) );
    //       console.log('error');
    //     })
    // };
    // reader.readAsBinaryString(file);
    // }

    // readFileContent(file) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       this.fileContent= reader.result;
    //         let base64 = 'base64,';
    //         const cont=this.fileContent.indexOf(base64) + base64.length;
    //         this.fileContent = this.fileContent.substring(cont);
    //         console.log('File Content:', this.fileContent);
            
    //     };
        
    //     reader.readAsDataURL(file);
    //     getAttId({fileContent:encodeURIComponent(this.fileContent)})
    //         .then(result=>{
    //           this.cvId=result;
    //           this.handleUpload();
    //           console.log('success');
    //         })
    //         .catch(error=>{
    //           console.log('fail');
    //         })
    // }


  //   handleUpload(){
  //   uploadFile({attachmentId:this.cvId,accessToken:this.token})
  //   .then(result=>{
  //     console.log('success at 134');
  //   })
  //   .catch(error=>{
  //     console.log('error at 137');
  //   })
  // }
  handleRowAction(event){
    const actionName = event.detail.action.name;
        const row = event.detail.row;
        const rowId = event.detail.row.id;
        console.log('row>>>>'+row);
        console.log('action>>>>'+actionName);
        switch(actionName){
          case 'View':
            this.showRowDetails(rowId);
             break;
          case 'Download':
            if(row.exportLinks != null){
              window.open(row.exportLinks['application/pdf'])
            }  
            else if(row.webContentLink != null){
              window.location.href = row.webContentLink;
            }
            else {
              window.alert('Unable to download file');
            }
            break;
        default:
        }
  }
  showRowDetails(rowId) {
    
    getView({token:this.token,row:rowId})
    .then(result=>{
      window.open(result);
      console.log('success>>>>'+result);
    })
    .catch(error=>{
      console.log('error>>>>>'+error);
    })
}

viewDetails(event){
  let keyId = event.target.value;
  console.log(keyId);
  this.showRowDetails(keyId)
}

downloadIcon(event){
  let downloadId = event.target.value;
  // this.downLoadRowFile(downloadId);
  if(downloadId.exportLinks != null){
    window.open(downloadId.exportLinks['application/pdf'])
  }  
  else if(downloadId.webContentLink != null){
    window.location.href = downloadId.webContentLink;
  }
  else {
    window.alert('Unable to download file');
  }
}

// downLoadRowFile(rowId){
//   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//   this.record = rowId;
//   console.log(this.record);
//   console.log("+++++++++++++++");
//   getAllDownloadData({row:rowId, token:this.token})
//   .then(result=>{
//     console.log("---------------------------------")
//     this.downloadData = result;
    
//     console.log("result>>>>>>>>", result);
//     console.log(this.downloadData);
//     this.downloadData.forEach(ele =>{
//       if(ele.id === this.record){
//         console.log("///////////////////");
//         if(ele.exportLinks != null){
//           console.log("======================");
//           for(let link of Object.keys(ele.exportLinks)){
//             if(link === 'application/pdf'){
//               window.open(ele.exportLinks[link])
//               window.alert("File Downloaded successfully");
//               console.log("????????????????????",ele.exportLinks[link]);
//             }
//           }
//         }
//         else if(ele.webContentLink != null){
//           console.log("Else if>>>>>>>>>>>>");
//           window.location.href = ele.webContentLink;
//         }
//         else {
//           console.log('File not downloaded');
//         }
//       }
//     })
//   })
//   .catch(error => {
//     console.log(error);
//   })
// }

handleListView(){
  this.listView = true;
  this.gridView = false;
  // console.log('token>>>>>>>',this.accessToken);
}

handleGridView(){
  this.gridView = true;
  this.listView = false;
}

handleBack(){
  window.history.back();
}

// pagination code 

handleFilePerPage(event) {
  this.pageSize = event.target.value;
  this.paginationHelper();
}


get bDisableFirst() {
  return this.pageNumber == 1;
}
get bDisableLast() {
  return this.pageNumber == this.totalPages;
}

previousPage() {
  this.pageNumber = this.pageNumber - 1;
  this.paginationHelper();
}
nextPage() {
  this.pageNumber = this.pageNumber + 1;
  this.paginationHelper();
}
firstPage() {
  this.pageNumber = 1;
  this.paginationHelper();
}
lastPage() {
  this.pageNumber = this.totalPages;
  this.paginationHelper();
}

paginationHelper(){
  this.recordsToDisplay = [];
  this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set files to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.records[i]);
        }
      }
  

      @track file;
      @track accessToken;
      @track location;
      @track chunks = [];
      @track fileSize;
      @track contents;
      @track isLoading = false;

      handleUploadFinished(event){
        this.isLoading = true;
        console.log('token>>>>>>>',this.token);
          console.log("🚀  file: updateInput.js:13  UpdateInput ~ chunks at first:", JSON.parse(JSON.stringify(this.chunks)))
         this.file = event.target.files[0];
         console.log("🚀  file: updateInput.js:17  UpdateInput  handleChange  file:", this.file)
         console.log(this.file, this.file.type, this.file.name );
         console.log("🚀  file: updateInput.js:19  UpdateInput  handleChange  this.file.name:", this.file.name)
         console.log("🚀  file: updateInput.js:19  UpdateInput  handleChange  this.file.type:", this.file.type)
         const reader = new FileReader();
         reader.onloadend = () => {
          console.log("347264523764");
             this.contents = reader.result;   
             console.log("second 578579655");
             console.log("🚀  file: updateInput.js:25  UpdateInput  handleChange  contents:", this.contents)
             this.fileSize = this.contents.length;
             console.log('fileSize >>>>>>>.', this.fileSize);
             console.log('content length>>>>>>>>.', this.contents.length);
             this.getLocation(this.file.type, this.token, this.file.name);
          }
          reader.readAsBinaryString(this.file);
          
      }
      getLocation(fileType, token, fileName){
          console.log("Inside location get 11111111111");
          const split = 1024*256;
          console.log(split); 
          for(var i =0; i<this.contents.length; i+= split){
              const chunk = this.contents.slice(i, i + split);
              this.chunks.push(chunk);
              console.log(chunk);
            }
          console.log('content length>>>>>>>>.', this.contents.length);
          console.log("chunks>>>>>>>>>>>>>", JSON.parse(JSON.stringify(this.chunks)));
          uploadFile({type: fileType , access_token : token, fileName :fileName})
          .then(result => {
           this.location = result;
           console.log('location>>>',result, this.location);
           this.updateChunks(this.fileSize,this.location);
          })
          .catch(error => {
              console.log(error)
          });
      }
  
      async updateChunks(fileSize, location){
          console.log("inside upload 1111111111111111111111111111111111");
          console.log("location>>>>>>>>>>>", this.location);
      // start = 0;
          // this.chunks.forEach(async chunk => {
          //     console.log('2nd function');
          //     let end = start + chunk.length-1;
          //     console.log('start>>>>> ', start);
          //     console.log('end>>>>>>>>', end);
          //    await uploadCh({fileSize: fileSize, start: start, locationUrl : location, chunkLength : end,chunk: btoa(chunk)})
          //    .then(result => {
          //     console.log('successful');
          //    })
         
          // .catch(error => {
          //     console.log("Error>>>>>>>>>>>>>>>>>>",error);
          // })
          // start = end + 1;
      // })
      console.log('this.location>>>>>>>>>', this.location);
      let start = 0;
      for(let i=0; i<this.chunks.length; i++){
          const endVal = start+this.chunks[i].length -1;
          console.log("i>>>>>>>>>>>>>>", i);
          console.log('start>>>>>>>>>', start);
          console.log('end>>>>>', endVal);
          console.log('chunks[i] length>>>>>>>>>', this.chunks[i].length);
          console.log('fileSize>>>>>>>>>', fileSize);
  
          // await uploadCh({fileSize: fileSize, start: start, locationUrl: this.location, chunkLength: endVal, chunk: btoa(this.chunks[i])})
          await uploadBlob({location: this.location, start: start, endValue: endVal, fileSize: this.fileSize, chunk: btoa(this.chunks[i]), accessToken: this.token})
          .then(result=>{
              console.log("Successfull");
          })
          .catch(error=>{
              console.log('error>>>>>>>>>>>..', error);
          })
          start=endVal+1;
      }
      this.isLoading = false;
      this.showToast('success','<strong>File successfully Inserted<strong/>','utility:success',2000);
      }    




      @track type='success';
      @track message;
      @track messageIsHtml=false;
      @track showToastBar = false;
      @api autoCloseTime = 5000;
      @track icon='';
      
      @api
      showToast(type, message,icon,time) {
          this.type = type;
          this.message = message;
          this.icon=icon;
          this.autoCloseTime=time;
          this.showToastBar = true;
          setTimeout(() => {
              this.closeModel();
          }, this.autoCloseTime);
      }
      
      closeModel() {
          this.showToastBar = false;
          this.type = '';
          this.message = '';
      }
   
      get getIconName() {
          if(this.icon)
          {
              return this.icon;
          }
          return 'utility:' + this.type;
      }
   
      get innerClass() {
          return 'slds-icon_container slds-icon-utility-' + this.type + ' slds-m-right_small slds-no-flex slds-align-top';
      }
   
      get outerClass() {
          return 'slds-notify slds-notify_toast slds-theme_' + this.type;
      }
}