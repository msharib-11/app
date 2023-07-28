import {LightningElement,wire,track} from 'lwc';
import fetchResume from '@salesforce/apex/resumeDisplayApex.fetchResume'; //apex method for retrieving resume data
import fetchFields from '@salesforce/apex/resumeDisplayApex.fetchFields'; //apex method for retrieving resume fields
import jsPDF from '@salesforce/resourceUrl/jsPDF';
import jsPDFAutoTableScript from '@salesforce/resourceUrl/jsPDFAutoTableScript'
import resumeMemberIcon from '@salesforce/resourceUrl/resumeMemberIcon'
import { loadScript } from 'lightning/platformResourceLoader';



//By Deepanshu----------------------
import {publish,MessageContext,subscribe,unsubscribe} from 'lightning/messageService';
import totalDataPublish from '@salesforce/messageChannel/resumeDataChannel__c'; //message channel for sending total data to filter component
import filterDataPublish from '@salesforce/messageChannel/resumeFilterDataChannel__c'; //message channel for receiving filtered data from filter component
//By Deepanshu ----------------

import { labels } from 'c/labelsUtility';

// option values for recordsPerPage combobox
const option = [{
        label: '5',
        value: '5'
    },
    {
        label: '10',
        value: '10'
    },
    {
        label: '20',
        value: '20'
    },
    {
        label: '30',
        value: '30'
    },
    {
        label: '40',
        value: '40'
    }
]

export default class ResumeDisplayComponent extends LightningElement{
    @track myResumeMemberIcon = resumeMemberIcon;
    subscription = null; //subscription for subscribing to lightning message channels
    @track myLabel=labels;
    // By Rahul-----------------------Start
    @track resumeData; //contains resume data from apex
    @track error; //contains error, if any
    @track options=option; //page size change options
    @track columns=[]; //table columns
    @track recordsPerPage; //current page size
    @track currentPage; //current page number
    @track totalPages=[]; //contains total number of pages
    @track totalData=[]; //total data received from apex method
    @track searchData; // data after applying search
    @track pages=[]; //all the page numbers 
    @track gridView=true; //toggle grid view
    @track tableView=false; //toggle table view
    @track gridButton='slds-p-right_small slds-col slds-size_1-of-2 active-view view_toggle'; //classes for grid
    @track tableButton='slds-p-right_small slds-col slds-size_1-of-2 active-view'; //classes for table
    // By Rahul-----------------------End
    @track name; //keep track of name of resume's member name
    @track experience; //keep track of name of resume's member experience
    @track resumeLink; //keep track of name of resume's link
    @track expertise; //keep track of name of resume's member expertise
    @track showButton = false; // To show download and cancel button on onclick of select resume button
    @track contentList = []; //Contains list of string of contents of selected files
    @track filesContent; //contain a string that contain data to show on a resume
    @track type = 'success'; // used in show toast
    @track message;
    @track messageIsHtml = false;
    @track showToastBar = false;
    @track icon = '';
    @track showCheckbox = false;
    @track showCheckbox2 = false;
    @track showBar = 'Copy to Clipboard!'
    @track showSelectButton = true;
    @track checkAllBox = false;
    @track jsPdfInitialized = false;
    @track id;
    @track idList = [];
    @track copyDataList = '';
    @track selectedResumesCount = 0;
    // @track currentCondition = false;
    // selectButton = 'none';
    //  selectButton = this.template.querySelector('.button-select').style.display;

    connectedCallback() {
        this.recordsPerPage = 10;
        this.currentPage = 1;
        this.subscribeToMessageChannel(); //call for subscribing to the message channel
        console.log('connected');
        fetchResume({objectName: 'Resume__c', fieldSetName: 'sfass_Resume_Field_Set'})
        .then(result=>{
        if(result) {
        this.totalData=[...result];
        this.displayData = this.totalData; //Change by deepanshu
        for(let key in this.totalData) {
        this.totalData[key]={...this.totalData[key], Expertise_Key: this.totalData[key].Expertise_Key__c.split(';'), Member__rName:this.totalData[key].Member__r.Name, Member__rProfile__c:this.totalData[key].Member__r.Profile__c};
        }
        this.searchData=this.displayData; ///Change by deepanshu
        console.log('this.totalData>>>>>>>>>>>>>>>>', this.totalData);
        console.log('this.displayData>>>>>>>>>>>>>>>>', this.displayData);
        this.handleTotalPages();
        this.validatePage();
        this.pagination();
        this.publishData(); ///////Change by Deepanshu --------------------
        }
        })
        .catch(error=> {
        console.log('error>>>>>>>>>>>>>>>>', error);
        this.error=error;
        })
        
        
        fetchFields({objectName: 'Resume__c', fieldSetName: 'sfass_Resume_Field_Set'})
        .then(result=>{
        for(let key in result) {
        const col={label: Object.values(result[key])[0], fieldName: Object.keys(result[key])[0]};
        this.columns.push(col);
        }
        })
        .catch(error=>{
        console.log("🚀 ~ file: resumeDisplayComponent.js:266 ~ ResumeDisplayComponent ~ wiredFields ~ error:", error)
        })
        }
        

    ///////Change by Deepanshu ---------------------------------------------------------------------
    //Retrieve Filtered Data for display component using resumeFilterDataChannel
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
        console.log('disconnected');
    }
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                filterDataPublish,
                (message) => this.handleMessage(message)
            );
        }
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    handleMessage(message) {
        this.filteredData = message.filterData;
        console.log("🚀  file: resumeFilterComponent.js:40  ResumeFilterComponent  handleMessage  Data from filter component>>>>>:", JSON.parse(JSON.stringify(this.filteredData)));
        // this.resumeData = this.filteredData;  //FOR TESTING ONLY
        if (this.filteredData) {
            this.searchData = this.filteredData;
        } else {
            this.searchData = this.totalData;
        }
        this.handleTotalPages();
        this.pagination();
    }

    @wire(MessageContext) messageContext;
    ///////Change by Deepanshu till here --------------------------------------------------------------


    ///////Change by Deepanshu -----------------------------------------------------------------------------------
    //Publish total data for filter component using resumeDataChannel
    publishData() {
        const payLoad = {
            totalData: this.totalData
        };
        publish(this.messageContext, totalDataPublish, payLoad);
        console.log("🚀  file: resumeDisplayComponent.js:63  ResumeDisplayComponent  publishData  payLoad:", JSON.parse(JSON.stringify(payLoad)));
    }
    ///////Change by Deepanshu till here ----------------------------------------------------------------



    //Amogh and palak-------------------------------------------------------------------------------
    // To download the selected files by clicking on download button
    generatePdf() {
        console.log('worked');
        let body = [];
        // let index=[];
        for (let i = 0; i < this.contentList.length; i++) {
            let nameArr = this.contentList[i].split(',');

            body.push([i + 1, nameArr[0], nameArr[1], nameArr[2].split(';'), nameArr[3], nameArr[4]]);
        }
        if (this.contentList.length > 0) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.setFontSize(0);
            doc.text('', 45, 40);
            console.log('Workng at 137');
            doc.autoTable({
                columnStyles: {
                    0: {
                        halign: 'center',
                        fillColor: [211, 211, 211]
                    }
                }, // Cells in first column centered and green
                margin: {
                    top: 10
                },
                head: [
                    ['S.No.', 'Name', 'Experience(in years)', 'Expertise', 'Profile', 'Resume Link']
                ],
                body: body,
            })
            console.log('working at 151');
            //window.open(URL.createObjectURL(pdf.output("blob")))
            doc.save('Resume Details.pdf');

            this.showToast('success', 'Files Downloaded successfully!', 'utility:success', 3000);
            this.showButton = false; //current change on 138
            this.showSelectButton = true; //current change on line 139
            this.showCheckbox = false; //current change on 140
            this.showCheckbox2 = false;
            this.checkAllBox = false; //current change on 141
            this.contentList = []; //current change on 142
            this.idList = [];
            this.selectedResumesCount = 0;

            body = [];
        } else {
            this.showToast('error', 'Please select the files first!', 'utility:error', 3000);
        }
    }


    //Custom show toast start-->>
    showToast(type, message, icon, time) {
        this.type = type;
        this.message = message;
        this.icon = icon;
        this.autoCloseTime = time;
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
        if (this.icon) {
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
    // Custom show toast end-->>

    //----------------------------------------------------------------------------------------------


    // By Rahul-----------------------Start
    //wire method to get fields from apex 
    // @wire(fetchFields)
    // wiredFields(result, error) {
    //     if(result.data) {
    //         for(let key in result.data) {
    //             const col={label: Object.values(result.data[key])[0], fieldName: Object.keys(result.data[key])[0]};
    //             this.columns.push(col);
    //         }
    //     }
    //     else if(error) {
    //     }
    // }
// By Rahul-----------------------End

    // By Rahul-----------------------Start
    //wire method to get resume data from apex
    // @wire(fetchResume)
    // wiredResume(result, error) {
    //     console.log('result>>>>>>>>>>>>>>>>', result);
    //     if(result.data) {
    //         this.totalData=[...result.data];
    //         this.displayData = this.totalData; //Change by deepanshu
    //         for(let key in this.totalData) {
    //             this.totalData[key]={...this.totalData[key], Expertise_Key: this.totalData[key].Expertise_Key__c.split(';'), Member__rName:this.totalData[key].Member__r.Name, Member__rProfile__c:this.totalData[key].Member__r.Profile__c};
    //         }
    //         this.searchData=this.displayData; ///Change by deepanshu
    //     console.log('this.totalData>>>>>>>>>>>>>>>>', this.totalData);
    //     console.log('this.displayData>>>>>>>>>>>>>>>>', this.displayData);
            
    //         this.handleTotalPages();
    //         this.validatePage();
    //         this.pagination();
    //         this.publishData();  ///////Change by Deepanshu --------------------
    //     }
    //     else if(error) {
    //     console.log('error>>>>>>>>>>>>>>>>', error);
    //         this.error=error;
    //     }
    // }
// By Rahul-----------------------End


  
    // By Rahul-----------------------Start
    // method for handling changes in recordsPerPage combobox
    handleRecordsPerPage(event) {
        this.recordsPerPage=event.target.value;
        this.currentPage=1;
        this.validatePage();
        this.handleTotalPages();
        this.pagination();
    }
// By Rahul-----------------------End


   // By Rahul-----------------------Start
    //handles number of pages to be render on custom page select buttons
    paginate(current, last) {
        var delta = 1,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;
    
        for (let i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push({label: (l + 1), value: (l + 1), disabled: false});
                } else if (i - l !== 1) {
                    rangeWithDots.push({label: '...', value: '...', disabled: true});
                }
            }
            rangeWithDots.push({label: (i), value: (i), disabled: false});
            l = i;
        }
        return rangeWithDots;
    }
// By Rahul-----------------------End


   // By Rahul-----------------------Start
    //gets total number of pages
    handleTotalPages() {
        this.totalPages=Math.ceil(this.searchData.length/this.recordsPerPage);
        this.pages=this.paginate(1, this.totalPages);
    }
// By Rahul-----------------------End

   // By Rahul-----------------------Start
    //handles change in current page 
    handlePage(event) {
        const buttonName=event.target.name;
        switch(buttonName) {
            case 'first': {
                this.currentPage=1;
                break;
            }
            case 'previous': {
                this.currentPage-=1;
                break;
            }
            case 'next': {
                this.currentPage+=1;
                break;
            }
            case 'last': {
                this.currentPage=this.totalPages;
                break;
            }
            case 'custom_page': {
                if(event.target.value!='...') {
                    this.currentPage=event.target.value;
                }
                break;
            }
        }
        this.validatePage();
        this.pagination();
    }
// By Rahul-----------------------End

    // By Rahul-----------------------Start
    // main pagination function for slicing the total data in pages
    pagination() {
        var records=[];
        for(let i=(this.currentPage-1)*this.recordsPerPage; i<this.currentPage*this.recordsPerPage; i++) {
            if(this.searchData[i]) {
                records.push(this.searchData[i]);
            }
        }
        this.resumeData=records;
        if(this.resumeData.length==0) {
            
            this.resumeData=undefined;
         }
        
    }
// By Rahul-----------------------End

   // By Rahul-----------------------Start
    //validates that the page number stays in bounds
    validatePage() {
        if(this.currentPage<1) {
            this.currentPage=1;
        }
        if(this.currentPage>=this.totalPages) {
            this.currentPage=this.totalPages;
        }
        this.pages=this.paginate(this.currentPage, this.totalPages);
    }
// By Rahul-----------------------End

    renderedCallback() {
         // By Rahul--------------------------Start
         console.log('rendered');
        //  this.pagination();
         let para='.page_button';
         let buttons=this.template.querySelectorAll(para);            
         buttons.forEach((i)=>{
             if(i.disabled==false) {
                 if(i.value==this.currentPage) {
                     i.variant='brand';
                 }
                 else {
                     i.variant='brand-outline';
                 }
             }
         })
         // By Rahul--------------------------End

        loadScript(this, jsPDF).then(() => {
            loadScript(this, jsPDFAutoTableScript); //new Changes
        });
        if (this.jsPdfInitialized) {
            return;
        }
        this.jsPdfInitialized = true;
    }
    
   // By Rahul-----------------------Start
    // handles searchKey value and filters data accordingly
    handleSearch(event) {
        const searchKey=event.target.value;
        var tempData=[];
        for(let i=0; i<this.totalData.length; i++) {
            if(this.totalData[i].Member__r.Name.toLowerCase().includes(searchKey.toLowerCase())) {
                tempData.push(this.totalData[i]);
            }
        }
        this.searchData=tempData;
        this.currentPage=1;
        this.handleTotalPages()
        this.pagination();
    }
    // By Rahul-----------------------End
    // By Rahul-----------------------Start
    //handle grid view rendering on button
    handleGrid() {
        this.gridView=true;
        this.tableView=false;
        this.gridButton='slds-p-right_small slds-col slds-size_1-of-2 active-view view_toggle'
        this.tableButton='slds-p-right_small slds-col slds-size_1-of-2 active-view'
    }
    // By Rahul-----------------------End

      // By Rahul-----------------------Start
    //handle table view rendering on button
    handleTable() {
        this.gridView=false;
        this.tableView=true;
        this.gridButton='slds-p-right_small slds-col slds-size_1-of-2 active-view'
        this.tableButton='slds-p-right_small slds-col slds-size_1-of-2 active-view view_toggle'
    }
    // By Rahul-----------------------End

    // Amogh and palak--------------------------------------------------------------------------------------------
    // method for pushing the resume details into array to download
    handleChange(event) {
        this.id = event.target.id;
        this.profile = event.target.profile;
        const splitId = this.id.split('-');
        console.log('id>>>' + splitId[0]);
        this.name = event.target.name;
        this.experience = event.target.experience;
        this.resumeLink = event.target.link;
        this.expertise = event.target.expertise;
        this.filesContent = this.name + ',' + this.experience + ',' + this.expertise + ',' + this.profile + ',' + this.resumeLink;
        if (event.target.checked) {
            this.selectedResumesCount += 1;
            this.idList.push(splitId[0]);
            console.log('idlist>>' + this.idList);
            this.contentList.push(this.filesContent);
        } else if (!event.target.checked) {
            this.selectedResumesCount -= 1;
            const index = this.contentList.indexOf(this.filesContent);
            const index3 = this.idList.indexOf(splitId[0]);
            console.log('index>>>' + index3);
            if (index > -1) { // only splice array when item is found
                this.contentList.splice(index, 1); // 2nd parameter means remove one item only
            }
            if (index3 > -1) {
                this.idList.splice(index, 1);
            }
        }
    }
   
    handleCheckbox() {
        if(this.showButton==false){
        this.showCheckbox = true;
        this.showSelectButton = false;
        this.showButton = true;
        this.showCheckbox2 = true;
        }
        else{
            this.showCheckbox = false;
        this.showSelectButton = true;
        this.showButton = false;
        this.showCheckbox2 = false;
        this.contentList = []; //current change on 142
        this.selectedResumesCount = 0;
            this.idList = [];
        }
        
    }
    //method to download selected all resume in one click
    selectAllDownload() {
        for (let i = 0; i < this.resumeData.length; i++) {
            let name = this.resumeData[i].Member__r.Name;
            let experience = this.resumeData[i].Experience__c;
            let resumeLink = this.resumeData[i].Resume_Link__c;
            let expertise = this.resumeData[i].Expertise_Key__c;
            let profile = this.resumeData[i].Member__r.Profile__c;

            this.filesContent = name + ',' + experience + ',' + expertise + ',' + profile + ',' + resumeLink;
            console.log('file>>' + this.filesContent);
            this.contentList.push(this.filesContent);
            this.selectedResumesCount = this.contentList.length;
        }
    }

    downloadCsv() {
        let csvString = '';
        let columnDivider = ',';
        let keys = ['  Name', '  Experience(in years)', '  Expertise', '  Profile', '  ResumeLink'];
        csvString += keys.join(columnDivider);
        csvString += '\n\n';

        for (let i = 0; i < this.contentList.length; i++) {
            const splitData = this.contentList[i].split(',');
            let splittedData = ['  ' + splitData[0] + '  ', splitData[1] + '  ', '  ' + splitData[2], '  ' + splitData[3], '  ' + splitData[4]];
            csvString += splittedData.join(columnDivider);
            csvString += '\n';
        }
        if (this.contentList.length > 0) {
            // Creating anchor element to download
            let downloadElement = document.createElement('a');

            // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
            downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);


            downloadElement.target = '_self';
            // CSV File Name

            downloadElement.download = 'Resume Details.csv';
            // below statement is required if you are using firefox browser
            document.body.appendChild(downloadElement);
            // click() Javascript function to download CSV file
            downloadElement.click();
            this.showToast('success', 'Files Downloaded successfully!', 'utility:success', 3000);
            this.showButton = false; //current change on 138
            this.showSelectButton = true; //current change on line 139
            this.showCheckbox = false; //current change on 140
            this.showCheckbox2 = false;
            this.checkAllBox = false; //current change on 141
            this.contentList = []; //current change on 142
            this.idList = [];
            this.selectedResumesCount = 0;

        } else {
            this.showToast('error', 'Please select the files first!', 'utility:error', 3000);
        }

    }

    downloadXl() {
        const data = [
            ['  Name', '  Experience(in years)', '  Expertise', '  Profile', '  ResumeLink\n'],
        ]


        for (let i = 0; i < this.contentList.length; i++) {
            const splitData = this.contentList[i].split(',');
            let splittedData = ['  ' + splitData[0] + '  ', splitData[1] + '  ', '  ' + splitData[2], '  ' + splitData[3], '  ' + splitData[4]];
            data.push(splittedData);
        }
        let excelData = '';

        // Prepare data for excel.You can also use html tag for create table for excel.
        data.forEach((rowItem, rowIndex) => {

            if (0 === rowIndex) {
                // This is for header.
                rowItem.forEach((colItem, colIndex) => {
                    excelData += colItem + ',';
                });
                excelData += "\r\n";

            } else {
                // This is data.
                rowItem.forEach((colItem, colIndex) => {
                    excelData += colItem + ',';
                })
                excelData += "\r\n";
            }
        });

        if (this.contentList.length > 0) {
            // Create the blob url for the file. 
            excelData = "data:text/xlsx," + encodeURI(excelData);

            let a = document.createElement("A");
            a.setAttribute("href", excelData);
            a.setAttribute("download", "Resume Details.xlsx");
            document.body.appendChild(a);
            a.click();
            this.showToast('success', 'Files Downloaded successfully!', 'utility:success', 3000);
            this.showButton = false; //current change on 138
            this.showSelectButton = true; //current change on line 139
            this.showCheckbox = false; //current change on 140
            this.showCheckbox2 = false;
            this.checkAllBox = false; //current change on 141
            this.contentList = []; //current change on 142
            this.idList = [];
            this.selectedResumesCount = 0;

        } else {
            this.showToast('error', 'Please select the files first!', 'utility:error', 3000);

        }

    }
    downloadDocx() {

        let body = [];
        for (let i = 0; i < this.contentList.length; i++) {
            let nameArr = this.contentList[i].split(',');
            body.push([i + 1, nameArr[0], nameArr[1], nameArr[2].split(';'), nameArr[3], nameArr[4]]);
        }


        // ... (Previous code)
        if (this.contentList.length > 0) {

            const tableHeaders = ['S.No.', 'Name', 'Experience(in years)', 'Expertise', 'Profile', 'Resume Link'];
            let tableRows = [tableHeaders, ...body];

            // Add margin styles to the table
            const marginStyles = 'margin: 20px;'; // Adjust the margin value as needed
            const tableStyle = 'border-collapse: collapse; ' + marginStyles;
            const tableCellStyles = 'border: 1px solid black; padding: 3px;';

            // Wrap each table row with style tags
            tableRows = tableRows.map((row) => {
                return `<tr style="${tableCellStyles}">${row.map((cell) => `<td style="${tableCellStyles}">${cell}</td>`).join('')}</tr>`;
            });

            // Create a new empty doc
            const doc = document.createElement('a');
            const docContent = [];

            // Build the table content with table styles
            docContent.push(`<table style="${tableStyle}">${tableRows.join('')}</table>`);

            // Convert the array of lines to a single string with line breaks
            const docData = docContent.join('\r\n');

            // Set the data in the href attribute and trigger the download
            doc.href = 'data:application/msword;charset=utf-8,' + encodeURIComponent(docData);
            doc.download = 'Resume Details.doc';
            doc.click();
            this.showToast('success', 'Files Downloaded successfully!', 'utility:success', 3000);
            this.showButton = false; //current change on 138
            this.showSelectButton = true; //current change on line 139
            this.showCheckbox = false; //current change on 140
            this.showCheckbox2 = false;
            this.checkAllBox = false; //current change on 141
            this.contentList = []; //current change on 142
            this.idList = [];
            this.selectedResumesCount = 0;

        } else {
            this.showToast('error', 'Please select the files first!', 'utility:error', 3000);

        }

        // ... (Rest of the code)
    }




    //method to select head checkbox to select all checkboxes
    checkAll(event) {
        if (event.target.checked) {
            this.checkAllBox = true;
            this.selectAllDownload();
            this.copyData();
            this.contentList = [];
        for (let i = 0; i < this.resumeData.length; i++) {
            let resumeId = this.resumeData[i].Id;
            let name = this.resumeData[i].Member__r.Name;
            let experience = this.resumeData[i].Experience__c;
            let resumeLink = this.resumeData[i].Resume_Link__c;
            let expertise = this.resumeData[i].Expertise_Key__c;
            let profile = this.resumeData[i].Member__r.Profile__c;
            let filesContent = name + ',' + experience + ',' + expertise + ',' + profile + ',' + resumeLink;

            this.contentList.push(filesContent);
            this.idList.push(resumeId);
        }
        this.selectedResumesCount = this.contentList.length;
        } else {
            this.checkAllBox = false;
            this.contentList = [];
            this.idList = [];
            this.selectedResumesCount = 0;
        }
    }

    copyData() {
        for (let i = 0; i < this.resumeData.length; i++) {
            console.log('resId>>>' + this.resumeData[i].Id);
            this.idList.push(this.resumeData[i].Id);
        }

    }

    //method to get the resumeId to fetch the details of it to copy
    copyToClipboard(event) {
        const resumeId = event.target.dataid;
        this.handleCopy(resumeId);
    }

    CopyAll() {
        for (let i = 0; i < this.idList.length; i++) {
            const resume = this.resumeData.find(item => item.Id === this.idList[i]);
            console.log('resume>>>>' + JSON.stringify(resume));
            const textToCopy = `${resume.Member__r.Name}\nProfile: ${resume.Member__r.Profile__c}\nResume Link: ${resume.Resume_Link__c}\nExperience: ${resume.Experience__c}\nExpertise Key: ${resume.Expertise_Key__c}`;
            console.log('copied>>>' + textToCopy);
            this.copyDataList += '\n\n' + textToCopy;
        }
        if (this.idList.length > 0) {
            console.log('copyData>>>>' + JSON.stringify(this.copyDataList));
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = this.copyDataList;
            document.body.appendChild(tempTextArea);

            tempTextArea.select();
            document.execCommand('copy');
            this.showToast('success', 'Copied', 'utility:copy', 3000);
            document.body.removeChild(tempTextArea);
            this.copyDataList = '';
            this.showButton = false; //current change on 138
            this.showSelectButton = true; //current change on line 139
            this.showCheckbox = false; //current change on 140
            this.showCheckbox2 = false;
            this.checkAllBox = false; //current change on 141
            this.contentList = []; //current change on 142
            this.selectedResumesCount = 0;
        } else {
            this.showToast('error', 'Please select the files first!', 'utility:error', 3000);

        }


    }
    // method to copy the details of resume
    handleCopy(resumeId) {
        const resume = this.resumeData.find(item => item.Id === resumeId);
        const textToCopy = `${resume.Member__r.Name}\nProfile: ${resume.Member__r.Profile__c}\nResume Link: ${resume.Resume_Link__c}\nExperience: ${resume.Experience__c}\nExpertise Key: ${resume.Expertise_Key__c}`;
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        this.showToast('success', 'Copied', 'utility:copy', 3000);
        document.body.removeChild(tempTextArea);
    }

    // -----------------------------------------------------------------------------------------------------------------

   


}