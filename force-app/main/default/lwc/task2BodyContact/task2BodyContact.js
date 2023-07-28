import { LightningElement, track, wire } from 'lwc';
// import getsortedCon from '@salesforce/apex/Task2Contact.getSortedContact';
import getCon from '@salesforce/apex/Task2Contact.getContacts';
import getDomain from '@salesforce/apex/Task2Contact.getOrgDomain';
import delCon from '@salesforce/apex/Task2Contact.delContact';
import sendEmail from '@salesforce/apex/Task2Contact.sendEmail';

export default class Task2BodyContact extends LightningElement {
    // @track data;
    // @track error;
    // @track initialRecords;
    @track searchkey = '';
    @track sortBy = 'LastName';
    @track sortDirection = 'asc';

    @track delmsg;
    @track visible;

    @track viewAction = false;
    @track editAction = false;
    @track CreateNewContact = false;
    @track recordId;

    @track pageSizeOptions = [5, 10, 25, 50, 75, 100]; //Page size options
    @track records = []; //All records available in the data table

    @track totalRecords = 0; //Total no.of records
    @track pageSize; //No.of records to be displayed per page
    @track totalPages; //Total no.of pages
    @track pageNumber=1; //Page number    
    @track recordsToDisplay = []; //Records to be displayed on the page

    // @track row;
    @track refreshData;
    @track newRecordId;

    @track recStatus;
    @track statusVal = 'Yes';

    // @track currentRecordId;
    // @track isEditForm = false;
    // @track bShowModal = false;

    @track actions = [
        { label: 'View', name: 'view'}, 
        { label: 'Edit', name: 'edit'}, 
        { label: 'Delete', name: 'delete'}
    ];

    @track getallContact = [
        {label: 'LastName',fieldName: 'LastName', sortable: "true"},
        {label: 'Phone',fieldName: 'Phone', sortable: "true"},
        {label: 'Email',fieldName: 'Email', sortable: "true"},
        {label: 'Status', fieldName: 'ActiveCon__c', sortable: "true"},
        {
            type: 'action',
            typeAttributes: {
                rowActions: this.actions,
                menuAlignment: 'right',
            }
        }
    ];

    @wire(getCon,{searchValue:'$searchkey', sortfield:'$sortBy', sortOrder:'$sortDirection', activeVal:'$statusVal'}) 
    allContacts({data, error}) {
        // this.refreshData= result;
        // console.log('resylt>>>>>>>>>>>>', result);
        // console.log('+++++++++++++++++++++++' + JSON.stringify(data));
        if (data) {
            console.log('>.........>>>>>>>>>>>>>>>>'+JSON.stringify(data));
            // this.data = data;
            this.records = data;
            this.totalRecords = data.length; 
            // update total records count       
            console.log('this.totalRecords>>>>>>>>>>>>',this.totalRecords);     
            this.pageNumber=1;     
            this.pageSize = this.pageSizeOptions[0]; //set pageSize with default value as first option
            this.paginationHelper(); // call helper menthod to update pagination logic 
        } 
        else if (error) {
            console.log('error while fetch contacts--> ' + error);
        }
    }

    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        switch ( actionName ) {
            case 'view':
                // window.open(this.domain+'/lightning/r/Contact/'+row.Id+'/view')
                this.recordId = row.Id;
                this.viewAction = true;
                break;
            case 'edit':
                // window.open(this.domain+'/lightning/r/Contact/'+row.Id+'/edit')
                this.recordId = row.Id;
                this.editAction = true;
                break;
            case 'delete':
                // console.log('id>>>>>>>>>>>>>>' + row.Id)
                delCon({conId:row.Id})
                .then(result=>{
                    // location.reload()
                    this.delmsg = result;
                    // console.log(this.delmsg);
                    // if(this.delmsg == 'Successful'){
                    //     // this.visible = true;
                    //     setTimeout(() => {
                    //         this.visible = false;
                    //     }, 5000);
                    // }
                })
                break;    
            default:
        }
    }

    handleClickNewCon(){
        this.CreateNewContact = true;
        // window.open(this.domain+'/lightning/o/Contact/new')
    }

    newConCancel(){
        this.CreateNewContact = false;
    }

    cancelView(){
        this.viewAction = false;
    }

    cancelEdit(){
        this.editAction = false;
    }

    updatebtn(){
        this.editAction = false;
        // location.reload();
    }

    connectedCallback(){
        getDomain()
        .then(result=>{
            console.log('Domain>>>>>>>>>>>>>>>>>>>.',result)
            this.domain = result
        })
    }

    handleSuccess(event){
        this.newRecordId = event.detail.id
        console.log('id>>>>>>>>>>>>', this.newRecordId);
        sendEmail({recordId: this.newRecordId, status: 'Success'})
        .then(result => {
            // return refreshapex(this.refreshData);
            console.log(result);
        })
    }

    
    getRecordStatus(event){
        this.recStatus = event.detail;
        console.log('parent>>>>', this.recStatus);
        if(this.recStatus == 'Active'){
            this.statusVal = 'Yes';
        }
        else{
            this.statusVal = 'No';
        }
    }

    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }


    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
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

    // JS function to handel pagination logic 
    paginationHelper() {
        this.recordsToDisplay = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        // console.log('vvvvvvvvvvvvvvvvvvvvv',this.pageNumber);
        // console.log('______________',this.totalPages);
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        // console.log('wwwwwwwwwwwwwwwwwww',this.pageSize);
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            console.log('from paginationHelper');
            if (i === this.totalRecords) {
                break;
            }
            // console.log('>>>>>>>>>>>>>>>>',this.records[i]);
            // console.log('++++++++++++++++',this.records.data[i]);
            this.recordsToDisplay.push(this.records[i]);
        }
    }

    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }

    handleSearch(event){
        this.searchkey = event.target.value;
    }
}