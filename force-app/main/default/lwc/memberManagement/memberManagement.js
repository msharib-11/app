import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from "lightning/uiRecordApi";
import { refreshApex } from '@salesforce/apex';
import fetchRecords from '@salesforce/apex/DynamicRecordFetcher.fetchRecords';
import TIME_ZONE from '@salesforce/i18n/timeZone';
import LOCALE from "@salesforce/i18n/locale";
//import selectedLabels from '@salesforce/label/c.selected_Field_of_Member_Dual_Combobox';

// for(let i=0;i<5;i++){

// }
export default class MemberManagement extends LightningElement {
    searchKeyErrorMessage='';
    maxSize=524288;
    showModal=false;
    showEdit=false;// make it true on edit selection
    objectLabel='Edit Member';
    @api objectApiName
    @api fieldSetName
    selectedMembers;
    @api allFields;
    @api defaultFields;
    label;
    label2
    @track data;
    selectedLabels;
    editRecordId; //memeber id on edit
    @track data = [];
    @track columns = [];
    @track sortBy;
    @track sortDirection;
    @track memberRecords;
    @track records;
    @track paginationRecords;
    actions = [
        { label: 'View', name: 'view' },
        { label: 'Edit', name: 'edit' },
        { label: 'Delete', name: 'delete' },
    ];
    selectedColumns = [];
    connectedCallback() {
        console.log('TIME_ZONE : ',TIME_ZONE);
        console.log('LOCALE : ',LOCALE);
        try {
            this.handleParse()
            this.columns = selectedColumns;
    
        } catch (error) {
            console.log('OUTPUT : ', JSON.stringify(error));
        }
    }
    handleClose(){
        this.showEdit=false;
    }
    handlRecordSave(){
        this.showEdit=false;
        this.handleRecord();
        this.showToast('Success', 'Record Edited Succesfully', 'Success');
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
    handleSelectedColoumns(){
        const selectedColumns=[]
        this.selectedLabel.forEach(element => {
                element.value = element.value === 'TL_Lead__r.Name' ? 'TL_Name' : element.value;
                element.value = element.value === 'Manager__r.Name' ? 'Manager_Name' : element.value;
                element.value = element.value === 'PC_PM__r.Name' ? 'PC_PM_Name' : element.value;
                selectedColumns.push({ label: element.label, fieldName: element.value, sortable: "true" });
                
                // columnApiValue.push(element.value);
            })
            selectedColumns.push({
                type: "action",
                typeAttributes: {
                    rowActions: this.actions,
                    menuAlignment: "right"
                }
            });
             this.columns=selectedColumns
             this.handleRecord();
    }
    handleRecord(){
        const columnApiValue=[];
        this.label.forEach(element => {
                columnApiValue.push(element.value);
            })
        fetchRecords({
                objectName: 'Contact',
                fieldsList: columnApiValue
            }).then(result => {
                result=result.map(item=>{
                    let TL_Name=('TL_Lead__c' in item) ? item.TL_Lead__r.Name:'';
                    let Manager_Name=('Manager__c' in item) ? item.Manager__r.Name:'';
                    let PC_PM_Name=('PC_PM__c' in item)? item.PC_PM__r.Name:'';
                    if(item.CreatedDate){
                    item.CreatedDate=new Date(item.CreatedDate).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
                    }
                    if(item.LastModifiedDate)
                    {
                    item.LastModifiedDate=new Date(item.LastModifiedDate).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
                    }
                    return { ...item, TL_Name,PC_PM_Name, Manager_Name};
                })
                this.data = result;
                this.memberRecords = result;
                this.records = result;
                this.paginationRecords=result;
                this.totalMembers = result.length;  
                this.pageNumber = 1;
                this.paginationHelper(this.records);
            })
                .catch(error => {
                    console.log('error occured ==> ', error);
                })
    }
    handleParse(){
       
            this.selectedLabel = JSON.parse(this.defaultFields)
            this.label = JSON.parse(this.allFields);
            this.handleSelectedColoumns();
    }

    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.paginationRecords));
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y): '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.data = parseData;
        this.records = parseData;
        this.paginationRecords = parseData;
        this.paginationHelper(parseData);
    } 



    //     data1 = [
    //         {label : 'name', apiValue : 'Name'},
    //         {label : 'age', apiValue : 'age__c'},
    //         {label : 'room', apiValue : 'room__c'},
    //         {label : 'birth', apiValue : 'birth__c'},
    //     ]

    //   daa = [

    //   ]

    //     labelSet = [
    //         {label : 'account'},
    //         {label : 'phone'},
    //         {label : 'address'},
    //         {label : 'room'},
    //         {label : 'age'},
    //         {label : 'birthDate'}
    //     ]

    //     data=[
    //         {account : 'surya', phone : '784545646',address:'mohali',room : '545', age : 20, birthDate : '12/5/2020'},
    //         {account : 'mohan', phone : '968405646',address:'lucknow',room : '205', age : 23, birthDate : '12/5/1996'},
    //     ];

    updateSelectedField(event) {
        let selectedField = [];
        selectedField = event.detail.selectedField;

        //for dynamic colums show
        const selectedColumns = [];

        selectedField.forEach(element => {
            element.value = element.value === 'TL_Lead__r.Name' ? 'TL_Name' : element.value;
            element.value = element.value === 'Manager__r.Name' ? 'Manager_Name' : element.value;
            element.value = element.value === 'PC_PM__r.Name' ? 'PC_PM_Name' : element.value;
            selectedColumns.push({ label: element.label, fieldName: element.value, sortable: "true" })
        })
        selectedColumns.push({
            type: "action",
            typeAttributes: {
                rowActions: this.actions,
                menuAlignment: "right"
            }
        });

        this.columns = selectedColumns;

        const apiNameForApex = [];
        selectedField.forEach(ele => {
            apiNameForApex.push(ele.value);
        })

    }

    handleSearch(event) {

        const searchKey = event.target.value.toLowerCase();
            let strRegex = new RegExp(/^[a-z0-9 ]+$/i);
            let result = strRegex.test(searchKey);
            if (result || searchKey == '') {
                this.searchKeyErrorMessage = ' ';
                this.maxSize=524288;
            }
            else {
                this.searchKeyErrorMessage = 'Special Characters are not allowed! Remove it';
                this.maxSize=searchKey.length
            }

        if (searchKey) {
            this.memberToDisplay = this.memberRecords; 
            if (this.memberToDisplay) {
                let recs = [];
                for (let rec of this.memberToDisplay) {
                    let valuesArray = Object.values(rec);
                    for (let val of valuesArray) {
                        let strVal = String(val);
                        if (strVal) {
                            if (strVal.toLowerCase().includes(searchKey)) {
                                recs.push(rec);
                                break;
                            }
                        }
                    }
                }
                this.paginationRecords = recs;
                this.totalMembers = this.paginationRecords.length;
                this.paginationHelper(this.paginationRecords);
            }
        }
        else {
            this.records = this.memberRecords;
            this.paginationRecords=this.memberRecords;
            this.totalMembers = this.records.length;
            this.paginationHelper(this.records);
        }
    }



    // @track pageSizeOptions = [5, 10, 25, 50, 75, 100];

    @track totalMembers = 0; //Total no.of records
    @api pageSize = Number(this.pageSize); //No.of records to be displayed per page
    @track totalPages; //Total no.of pages
    @track pageNumber = 1; //Page number    
    @track memberToDisplay = []; //Records to be displayed on the page


    // get options() {
    //     return [
    //         { label: '5', value: '5' },
    //         { label: '10', value: '10' },
    //         { label: '25', value: '25' },
    //     ];
    // }

    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }


    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper(this.records);
    }
    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper(this.records);
    }
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper(this.records);
    }
    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper(this.records);
    }
    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper(this.records);
    }

    // JS function to handel pagination logic 
    paginationHelper(x) {
        this.memberToDisplay = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalMembers / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalMembers) {
                break;
            }
            this.memberToDisplay.push(x[i]);
        }
    }


    getSelectedRec() {
        var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
        if(selectedRecords.length!==0){
            let ids = [];
            selectedRecords.forEach(ele=>{
                ids.push(ele.Id);
            })
            this.selectedMembers=ids;
            this.showModal=true;
        }
        else {
            this.dispatchEvent(
                new ShowToastEvent({
                  title: "Please select members",
                  message: "Please select members",
                  variant: "error",
                }),
            );
        }
    }
      
    handleModalClose(){
        this.selectedMembers=[];
        this.showModal=false;
    }


      getActionIdHandler(event){
        let actionName = event.detail.action.name;
        let rowId = event.detail.row.Id;
        let selectRowId = [];
        selectRowId.push(rowId);
        if(actionName==='view'){
        this.selectedMembers = selectRowId;
        this.showModal = true;
        }
        else if(actionName==='edit'){
            this.showEdit = true;
            this.editRecordId = rowId;
            // this.getSelectedRec();
        }
        else if(actionName==='delete'){
            deleteRecord(rowId)
            .then(() => {
              this.dispatchEvent(
                new ShowToastEvent({
                  title: "Success",
                  message: "Record deleted",
                  variant: "success",
                }),
              );
              
            })
            .catch((error) => {
              this.dispatchEvent(
                new ShowToastEvent({
                  title: "Error deleting record",
                  message: error.body.message,
                  variant: "error",
                }),
              );
            });
      }

      }

}