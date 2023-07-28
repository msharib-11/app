import { LightningElement, api, track, wire } from 'lwc';
import getFieldsAndRecords from '@salesforce/apex/ProjectDatatableHelper.getFieldsAndRecords';

// const columnsForProject = [
//     { label: 'Project Name', fieldName: 'Name' },
//     { label: 'Client Name', fieldName: 'Client_Name__c'},
//     { label: 'PC/PM Name', fieldName: 'PC_PM_Name__c'},
//     { label: 'TL Manager', fieldName: 'TL_Manager__c'},
//     { label: 'Total Hours', fieldName: 'Total_Hours__c'},
//     { label: 'Real Used Hours', fieldName: 'Real_Used_Hours__c'},
//     { label: 'Type', fieldName: 'Type__c'}  
// ];

export default class ProjectDataTable extends LightningElement {
    //columnsForProject = columnsForProject;

    @api objectApiName; //kind of related list object API Name e.g. 'Opportunity'
    @api fieldSetName; // FieldSet which is defined on that above object e.g. 'ProjectRelatedListFS'
    @api criteriaFieldAPIName; // This field will be used in WHERE condition e.g.'AccountId'
    @api firstColumnAsRecordHyperLink; //if the first column can be displayed as hyperlink
    @api criteriaFieldValue; // This field will be used in WHERE condition e.g.'AccountId' equalsto what value.
    @api objectApiNameForSecondObject; //kind of related list object API Name e.g. 'MemberDetails'.
    @api fieldSetNameForSecondObject; // FieldSet which is defined on that above object e.g. 'MemberDetailListFS'

    @track columns;   //columns for List of fields datatable
    @track tableData;   //data for list of fields datatable of Project object.
    @track memberDetailData;
    @track memberDetailColumns;
    fieldApiNameOfProject = [];
    listOfFieldsFromFieldset = [];
    recordId = '';
    displayEditForm = false;
    displayViewForm = false;
    //----changes been made-------------------------------------------
    selectToSend = true;
    lstSelectedRecords1;
    tableData = [];
    //columnHeader = ['Name' ,'Phone', 'Account Source', 'Annual Revenue', 'Contact Name'];
    @track columnHeader;
   //----------------------------------------------------------------------


    connectedCallback() {
        //make an implicit call to fetch records from database
        this.fieldsAndRecordsFetcher();
        
    }

    callRowAction(event) {
        const recId = event.detail.row.Id;
        const actionName = event.detail.action.name;
        if (actionName === 'Edit') {
            //this.handleAction(recId, 'edit');
            this.handleEdit();
        } else if (actionName === 'View') {
            this.handleView();
        }
    }

    handleSuccess(event) {
        this.recordId = event.detail.id
        console.log('Inside handlesuccess record edited successfully.......', this.recordId);
    }
    handleClose(){
        this.displayEditForm = false;
    }
    handleSubmit(){
        this.displayEditForm = false;
    }
    //edit button method for future use
    handleEdit(){
        this.displayEditForm = true;
    }

    //for viewing member details.
    handleView(){
        this.displayViewForm = true;
    }
    //For modal close 
    modalCloseHandler(){
        this.displayViewForm = false;
        log('close modal fire');
    }

    fieldsAndRecordsFetcher() {
        let firstTimeEntry = false;
        let firstFieldAPI;
        console.log('1=', this.objectApiName + ' 2=', this.fieldSetName, ' 3=', this.objectApiNameForSecondObject,' 4=', this.fieldSetNameForSecondObject);
        getFieldsAndRecords({
            strObjectApiName: this.objectApiName,
            strfieldSetName: this.fieldSetName,
            criteriaField: this.criteriaFieldAPIName,
            criteriaFieldValue: this.criteriaFieldValue,
            objectApiName: this.objectApiNameForSecondObject,
            fieldSetName: this.fieldSetNameForSecondObject
        })
            .then(data => {
                //get the entire map
                let mapOfFieldAndRecords = JSON.parse(data);

                /* retrieve listOfFields from the map,
                here order is reverse of the way it has been inserted in the map */
                let listOfFields = JSON.parse(Object.values(mapOfFieldAndRecords)[3]);
                this.listOfFieldsFromFieldset = listOfFields;
                console.log('Project object of listOfFields ==> ', this.listOfFieldsFromFieldset);
                //this.getFieldApiNames();
                //retrieve listOfRecords from the map
                let listOfRecords = JSON.parse(Object.values(mapOfFieldAndRecords)[2]);
                console.log('Project object ==> ', listOfRecords);
                let memberDetailFields = JSON.parse(Object.values(mapOfFieldAndRecords)[1]);
                //This is used to fetch the Second object records.
                let memberDetailRecords = JSON.parse(Object.values(mapOfFieldAndRecords)[0]);
                let items = []; //local array to prepare columns for ProjectObject.
                let itemsForMemberDetails = []; //local array to prepare columns for Member detail Object.

                /*if user wants to display first column has hyperlink and clicking on the link it will
                naviagte to record detail page. Below code prepare the first column with type = url
                */
                listOfFields.map(element => {
                    //it will enter this if-block just once
                    if (this.firstColumnAsRecordHyperLink != null && this.firstColumnAsRecordHyperLink == 'Yes'
                        && firstTimeEntry == false) {
                        firstFieldAPI = element.fieldPath;
                        //perpare first column as hyperlink
                        items = [...items,
                        {
                            label: element.label,
                            fieldName: 'URLField',
                            fixedWidth: 150,
                            type: 'url',
                            typeAttributes: {
                                label: {
                                    fieldName: element.fieldPath
                                },
                                target: '_blank'
                            },
                            sortable: true
                        }
                        ];
                        firstTimeEntry = true;
                    } else {
                        items = [...items, {
                            label: element.label,
                            fieldName: element.fieldPath
                        }];
                    }
                });

                //This method is used to fetch columns of second object.
                memberDetailFields.map(element => {
                    //it will enter this if-block just once
                    if (this.firstColumnAsRecordHyperLink != null && this.firstColumnAsRecordHyperLink == 'Yes'
                        && firstTimeEntry == false) {
                        firstFieldAPI = element.fieldPath;
                        //perpare first column as hyperlink
                        itemsForMemberDetails = [...itemsForMemberDetails,
                        {
                            label: element.label,
                            fieldName: 'URLField',
                            fixedWidth: 150,
                            type: 'url',
                            typeAttributes: {
                                label: {
                                    fieldName: element.fieldPath
                                },
                                target: '_blank'
                            },
                            sortable: true
                        }
                        ];
                        firstTimeEntry = true;
                    } else {
                        itemsForMemberDetails = [...itemsForMemberDetails, {
                            label: element.label,
                            fieldName: element.fieldPath
                        }];
                    }
                });

                items = [...items,{
                    type: "button", label: 'Member Details', initialWidth: 100, typeAttributes: {
                        label: 'View',
                        name: 'View',
                        title: 'View',
                        disabled: false,
                        value: 'view',
                        iconPosition: 'left',
                        iconName:'utility:preview',
                        variant:'Brand'
                    }
                },
                {
                    type: "button", label: 'Edit Project', initialWidth: 100, typeAttributes: {
                        label: 'Edit',
                        name: 'Edit',
                        title: 'Edit',
                        disabled: false,
                        value: 'edit',
                        iconPosition: 'left',
                        iconName:'utility:edit',
                        variant:'Brand'
                    }
                }];

                //finally assigns item array to columns
                console.log('Project columns is items= ', items);
                
                this.columns = items;
                //-----changes been made -----------------------------
                this.columnHeader = items;
                //-----------------------------------------------------
                this.memberDetailColumns = itemsForMemberDetails;
                this.tableData = listOfRecords;
                this.memberDetailData = memberDetailRecords;
                console.log('Member details records is = ', this.memberDetailData);

                console.log('listOfRecords', listOfRecords);
                /*if user wants to display first column has hyperlink and clicking on the link it will
                    naviagte to record detail page. Below code prepare the field value of first column
                */
                if (this.firstColumnAsRecordHyperLink != null && this.firstColumnAsRecordHyperLink == 'Yes') {
                    let URLField;
                    //retrieve Id, create URL with Id and push it into the array
                    this.tableData = listOfRecords.map(item => {
                        URLField = '/lightning/r/' + this.objectApiName + '/' + item.Id + '/view';
                        return { ...item, URLField };
                    });

                    //now create final array excluding firstFieldAPI
                    this.tableData = this.tableData.filter(item => item.fieldPath != firstFieldAPI);
                }
                if (this.firstColumnAsRecordHyperLink != null && this.firstColumnAsRecordHyperLink == 'Yes') {
                    let URLField;
                    //retrieve Id, create URL with Id and push it into the array
                    this.memberDetailData = memberDetailRecords.map(itemsForMemberDetails => {
                        URLField = '/lightning/r/' + this.objectApiName + '/' + itemsForMemberDetails.Id + '/view';
                        return { ...itemsForMemberDetails, URLField };
                    });

                    //now create final array excluding firstFieldAPI
                    this.memberDetailData = this.memberDetailData.filter(item => item.fieldPath != firstFieldAPI);
                }
                
            })
            .catch(error => {
                this.error = error;
                console.log('error', error);
                this.tableData = undefined;
                this.memberDetailData = undefined;
            })
           
    }
    // getFieldApiNames(){
    //     let iterable = this.listOfFieldsFromFieldset;
    //     let temporaryField = [];
    //     console.log('ieterable------------ ', iterable);
    //     for(const item of iterable){
    //         //console.log(item.fieldPath);
    //         temporaryField.push(item.fieldPath);
    //         console.log(temporaryField);
    //     }
    //     this.fieldApiNameOfProject = temporaryField
    //     console.log('this.fieldApiNameOfProject==============>', this.fieldApiNameOfProject);
    // }

    getSelectedRec() {
        console.log('inside method>>>>>>>>>>>>>>>>>>>>>');
        this.lstSelectedRecords1 = this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('selectedRecords are ', JSON.parse(JSON.stringify(this.lstSelectedRecords1)));
    
        console.log('--------------------->',this.listOfFieldsFromFieldset);
        console.log('--------------------->',this.listOfFieldsFromFieldset.length);

        console.log('--------------------->',this.listOfFieldsFromFieldset[0].fieldPath);
        let lstOfRecordsOfExlFile = [{}];
        lstOfRecordsOfExlFile = JSON.parse(JSON.stringify(this.lstSelectedRecords1));

        console.log('lstOfRecordsOfExlFile====', lstOfRecordsOfExlFile.length);

        // Prepare a html table
        let doc = '<table>';
        // Add styles for the table
        // need to change the style for 'th'
        doc += '<style>';
        doc += 'table, th, td {';
        doc += '    border: 1px solid black;';
        doc += '    border-collapse: collapse;';
        doc += '}';          
        doc += '</style>';
        // Add all the Table Headers
        doc += '<tr>';
        let arrOfHeaders =[];
        arrOfHeaders=JSON.parse(JSON.stringify(this.columnHeader))
        console.log('======>',JSON.parse(JSON.stringify(this.columnHeader)));

        arrOfHeaders.forEach(element => {            
            doc += '<th>'+ element.label +'</th>'           
        });
        doc += '</tr>';
        console.log('At line 297>>>>>>>>>>>>>',)
        // Add the data rows
       // console.log('line 299',JSON.parse(this.lstSelectedRecords1).size);
        for(let j =0; j<lstOfRecordsOfExlFile.length; j++){
            doc += '<tr>';
            console.log('OUTPUT : ', lstOfRecordsOfExlFile[j]);
            var record = lstOfRecordsOfExlFile[j];
            console.log('record data===', record);
            console.log('record data===', JSON.parse(JSON.stringify(record)));
            console.log('stringyfied data',JSON.parse(JSON.stringify(Object.keys(lstOfRecordsOfExlFile[j]))) );
            let objectForFields = [];
            // doc += '<th>'+record.Id+'</th>'; 
            console.log("##########");
            for( let i =0; i<this.listOfFieldsFromFieldset.length; i++){
             console.log('=====!!!!>',this.listOfFieldsFromFieldset[i].fieldPath);
             var fields = this.listOfFieldsFromFieldset[i].fieldPath;
             console.log('value of fields====>',record[fields] );
             console.log('Records values>>>>>>>>>>>>>>>>>>>...',JSON.parse(JSON.stringify(record)));//.valueOf(fields);
             if(record[fields] === undefined ){
                  doc += '<th>'+ null +'</th>';
             }else{
               doc += '<th>'+ record[fields] +'</th>';
             }
             
            // doc += '<th>'+record.lstOfRecordsOfExlFile[i].fieldPath+'</th>'; 
            }  
        }
     /*  this.lstSelectedRecords1.forEach(record => {
        console.log('!!!!!!');
            doc += '<tr>';
               // doc += '<th>'+record.Id+'</th>'; 
               for( let i =0; i<listOfFieldsFromFieldset.length; i++){
                console.log('=====!!!!>',listOfFieldsFromFieldset[i].fieldPath);
               // doc += '<th>'+record.lstOfRecordsOfExlFile[i].fieldPath+'</th>'; 
               }
            //    doc += '<th>'+record.Phone+'</th>';
            //    doc += '<th>'+record.AccountSource+'</th>'; 
            //    doc += '<th>'+record.AnnualRevenue+'</th>';
                //  // console.log(record.Contact_Name);
                //    // doc += '<th>' ;
                
                //    //console.log('#####');
                //    //record.Contact_Name.forEach((con)=>{
                //     //console.log('$$$$$');
                //     //doc += con.Name ;
                //     //console.log(con.Name);
                // // })
                // // doc += contatslist;
                // // doc +='</th>'
                // var contatslist=record.Contact_Name;
                // doc += '<th>'+contatslist+'</th>';
           
            doc += '</tr>';
        });*/
        doc += '</table>';
        console.log('Document Will be downloaded!!', doc);
        var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        console.log('Excel File>>>>',element );
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        downloadElement.download = 'Account Data.xls';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }

}