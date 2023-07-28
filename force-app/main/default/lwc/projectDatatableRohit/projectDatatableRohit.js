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

    @api objectApiName; //kind of related list object API Name e.g. 'Case'
    @api fieldSetName; // FieldSet which is defined on that above object e.g. 'CaseRelatedListFS'
    @api criteriaFieldAPIName; // This field will be used in WHERE condition e.g.'AccountId'
    @api firstColumnAsRecordHyperLink; //if the first column can be displayed as hyperlink
    @api criteriaFieldValue; // This field will be used in WHERE condition e.g.'AccountId' equalsto what value.
    @track columns;   //columns for List of fields datatable
    @track tableData;   //data for list of fields datatable
    recordId = ''
    displayEditForm = false
    connectedCallback() {
        //make an implicit call to fetch records from database
        this.fieldsAndRecordsFetcher();
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

    fieldsAndRecordsFetcher() {
        let firstTimeEntry = false;
        let firstFieldAPI;
        getFieldsAndRecords({
            strObjectApiName: this.objectApiName,
            strfieldSetName: this.fieldSetName,
            criteriaField: this.criteriaFieldAPIName,
            criteriaFieldValue: this.criteriaFieldValue
        })
            .then(data => {
                //get the entire map
                let mapOfFieldAndRecords = JSON.parse(data);

                /* retrieve listOfFields from the map,
                here order is reverse of the way it has been inserted in the map */
                let listOfFields = JSON.parse(Object.values(mapOfFieldAndRecords)[1]);
                console.log('listOfFields ==> ', listOfFields);
                //retrieve listOfRecords from the map
                let listOfRecords = JSON.parse(Object.values(mapOfFieldAndRecords)[0]);
                console.log('listOfRecords ==> ', listOfRecords);
                let items = []; //local array to prepare columns

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
                //finally assigns item array to columns
                console.log('columns is = ', items);
                this.columns = items;
                this.tableData = listOfRecords;

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
                
            })
            .catch(error => {
                this.error = error;
                console.log('error', error);
                this.tableData = undefined;
            })
    }
}