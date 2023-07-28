/**
 * @description       : This class is used to dynamically fetch records and field name to be used in LWC datatable.
 * @author            : Mayank Kumar Gupta
 * @group             : Group A => MayankGupta, Ayush Raj, Kavya Srivastava, Prerna Jhingran, Rohit Kumar.
 * @last modified on  : 07-25-2023
 * @last modified by  : Mayank Kumar Gupta
**/

import { LightningElement, api, track, wire } from 'lwc';
import getFieldsAndRecords from '@salesforce/apex/ProjectDatatableHelper.getFieldsAndRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// importing Custom Label
import ProjectDetailRecordEditForm from '@salesforce/label/c.ProjectDetailRecordEditForm';
import ProjectDatatableHeading from '@salesforce/label/c.ProjectDatatableHeading';
// importing class to send email
import sendXmlEmail from '@salesforce/apex/ProjectDatatableHelper.sendXmlEmail';

// row actions
const actions = [
    { label: 'View', name: 'View' },
    { label: 'Edit', name: 'Edit' }
];

export default class ProjectDataTable extends LightningElement {

    @api objectApiName; //kind of related list object API Name e.g. 'Opportunity'
    @api fieldSetName; // FieldSet which is defined on that above object e.g. 'ProjectRelatedListFS'
    @api criteriaFieldAPIName; // This field will be used in WHERE condition e.g.'AccountId'
    @api firstColumnAsRecordHyperLink; //if the first column can be displayed as hyperlink
    @api criteriaFieldValue; // This field will be used in WHERE condition e.g.'AccountId' equalsto what value.
    @api objectApiNameForSecondObject; //kind of related list object API Name e.g. 'MemberDetails'.
    @api fieldSetNameForSecondObject; // FieldSet which is defined on that above object e.g. 'MemberDetailListFS'
    @track columnHeader; //For column headers in xls file.
    @track lstSelectedRecords; //Stores the record of selected rows.
    @track projectRowData; // to store clicked row data of project.
    @track projectDatatableHeading = ProjectDatatableHeading;

    @track columns;   //columns for List of fields datatable
    // @track tableData;   //data for list of fields datatable of Project object.
    @track memberDetailData;
    @track memberDetaildataToSend;
    @track memberDetailColumns;
    @track modalHeaderForRecordEditForm = ProjectDetailRecordEditForm;
    @track downloadIconForProject = false;
    @track listOfFieldsFromFieldset = [];
    @track listOfMemberDetailFields = [];
    @track recordId = '';
    @track displayEditForm = false;
    @track displayViewForm = false;
    @track viewTemplateSwitcher = false;
    @track showLoadingSpinner = false;
    @track isvisible = false;
    @track MailId;
    @track showDatatable = false;

    //year and month filter
    @track year = 'None';
    @track month = 'None';
    @api yearFrom;
    @api yearTo;
    @api monthFrom;
    @api monthTo;
    @track optionsForYear = [];
    @track optionsForMonth = [];

    //Ayush - For pagination, searching, sorting.
    @track initialData;
    @track availableData;
    @track sortDirection = 'asc';
    @track sortBy = '';
    @track currentPage = 1;
    @track totalRecords;
    @track recordSize = '10';
    @track totalPage = 0;
    @track searchKey = '';
    @track searchKeyErrorMessage = '';
    @track searchedData;
    @track maxInput = 200;
    @track totalRecordsFetched;

    connectedCallback() {
        this.showLoadingSpinner = true;
        //make an implicit call to fetch records from database
        this.fieldsAndRecordsFetcher();
        this.yearAndMonthOptionSetter();
    }

    //Year and month filter
    //For setting Year and month combobox options
    yearAndMonthOptionSetter() {
        let yearOptions = [{ label: 'All', value: 'None' }];
        if (this.yearFrom !== null && this.yearFrom !== null) {
            for (let i = this.yearFrom; i <= this.yearTo; i++) {
                let temporaryOption;
                temporaryOption = { label: i, value: i.toString() };
                yearOptions.push(temporaryOption);
            }
            this.optionsForYear = yearOptions;
        }

        let monthOptions = [
            { label: 'All', value: 'None' },
            { label: 'JAN', value: 'January' },
            { label: 'FEB', value: 'February' },
            { label: 'MAR', value: 'March' },
            { label: 'APR', value: 'April' },
            { label: 'MAY', value: 'May' },
            { label: 'JUN', value: 'June' },
            { label: 'JUL', value: 'July' },
            { label: 'AUG', value: 'August' },
            { label: 'SEP', value: 'September' },
            { label: 'OCT', value: 'October' },
            { label: 'NOV', value: 'November' },
            { label: 'DEC', value: 'December' }
        ];
        this.optionsForMonth = monthOptions;
    }

    //onchange For Year
    handleChangeForYear(event) {
        this.year = event.detail.value;
        this.filterHandlerBasedOnYearAndMonth(this.year, this.month, this.initialData, this.memberDetailData);
    }

    //onchane For Month
    handleChangeForMonth(event) {
        this.month = event.detail.value;
        this.filterHandlerBasedOnYearAndMonth(this.year, this.month, this.initialData, this.memberDetailData);
    }

    //For project records filterout based on year and month both
    filterHandlerBasedOnYearAndMonth(year, month, projectDataToFilter, memberDataToFilter) {
        //First, we have to select only those member detail records which have inputed year or month or both
        //Then, we have to separate only unique project id from it and store in List
        //Then, We have to filter out only those project records which project ids are equal to the List
        //Then, pass the records to the datatable to display

        if (Object.is(projectDataToFilter, null) === false && Object.is(memberDataToFilter, null) === false && JSON.parse(JSON.stringify(projectDataToFilter)).length > 0 && JSON.parse(JSON.stringify(memberDataToFilter)).length > 0) {
            let recordsToIterate = JSON.parse(JSON.stringify(memberDataToFilter));
            let projectRecordsToIterate = JSON.parse(JSON.stringify(projectDataToFilter));

            if (year !== null && year !== 'None' && (month === null || month === 'None')) {
                const uniqueProjectIdWithInputedYear = recordsToIterate.reduce((acc, record) => {
                    if (record.Year__c === year && !acc.includes(record.Project__c)) {
                        acc.push(record.Project__c);
                    }
                    return acc;
                }, []);
                let uniqueProjectIdWithInputedYearToIterate = JSON.parse(JSON.stringify(uniqueProjectIdWithInputedYear));
                const matchingRecords = projectRecordsToIterate.filter(project => uniqueProjectIdWithInputedYearToIterate.includes(project.Id));
                this.paginationHanlder('', matchingRecords);

                if (matchingRecords.length === 0) {
                    this.showDatatable = false;
                    let title = 'No Records.';
                    let message = 'No projects are present for the selected year. Please try again with another year.';
                    let variant = 'error';
                    this.showToast(title, message, variant);
                }
                if (matchingRecords.length > 0) {
                    this.showDatatable = true;
                    let title = 'Records available.';
                    let message = 'There are ' + matchingRecords.length + ' project records are present for the selected year ' + year;
                    let variant = 'success';
                    this.showToast(title, message, variant);
                }
            }
            else if ((year === null || year === 'None') && month !== null && month !== 'None') {
                const uniqueProjectIdWithInputedYear = recordsToIterate.reduce((acc, record) => {
                    if (record.Month__c === month && !acc.includes(record.Project__c)) {
                        acc.push(record.Project__c);
                    }
                    return acc;
                }, []);
                let uniqueProjectIdWithInputedYearToIterate = JSON.parse(JSON.stringify(uniqueProjectIdWithInputedYear));
                const matchingRecords = projectRecordsToIterate.filter(project => uniqueProjectIdWithInputedYearToIterate.includes(project.Id));
                this.paginationHanlder('', matchingRecords);

                if (matchingRecords.length === 0) {
                    this.showDatatable = false;
                    let title = 'No Records.';
                    let message = 'No projects are present for the selected month. Please try again with another month.';
                    let variant = 'error';
                    this.showToast(title, message, variant);
                }
                if (matchingRecords.length > 0) {
                    this.showDatatable = true;
                    let title = 'Records available.';
                    let message = 'There are ' + matchingRecords.length + ' project records are present for the selected month ' + month;
                    let variant = 'success';
                    this.showToast(title, message, variant);
                }
            }
            else if ((year !== null && year !== 'None') && (month !== null && month !== 'None')) {
                const uniqueProjectIdWithInputedYear = recordsToIterate.reduce((acc, record) => {
                    if (record.Year__c === year && record.Month__c === month && !acc.includes(record.Project__c)) {
                        acc.push(record.Project__c);
                    }
                    return acc;
                }, []);
                let uniqueProjectIdWithInputedYearToIterate = JSON.parse(JSON.stringify(uniqueProjectIdWithInputedYear));
                const matchingRecords = projectRecordsToIterate.filter(project => uniqueProjectIdWithInputedYearToIterate.includes(project.Id));
                this.paginationHanlder('', matchingRecords);

                if (matchingRecords.length === 0) {
                    this.showDatatable = false;
                    let title = 'No Records.';
                    let message = 'No projects are present for the selected year & month. Please try again with another entry.';
                    let variant = 'error';
                    this.showToast(title, message, variant);
                }
                if (matchingRecords.length > 0) {
                    this.showDatatable = true;
                    let title = 'Records available.';
                    let message = 'There are ' + matchingRecords.length + ' project records are present for the selected year ' + year + ' month ' + month;
                    let variant = 'success';
                    this.showToast(title, message, variant);
                }
            }
            else {
                this.paginationHanlder('', projectDataToFilter);
                this.showDatatable = true;
            }
        }
        else {
            let title = 'No Records.';
            let message = 'No projects are present.';
            let variant = 'error';
            this.showToast(title, message, variant);
            this.showDatatable = false;
        }
    }

    callRowAction(event) {
        this.projectRowData = event.detail.row;
        const recId = event.detail.row.Id;
        this.recordId = recId;
        const actionName = event.detail.action.name;
        if (actionName === 'Edit') {
            this.handleEdit();
        } else if (actionName === 'View') {
            this.handleView(recId);
        }
    }

    handleSuccess(event) {
        this.fieldsAndRecordsFetcher();
        let title = 'Successfully updated.';
        let message = 'Project record is successfully updated.';
        let variant = 'success';
        this.showToast(title, message, variant);
        this.showLoadingSpinner = false;
        this.fieldsAndRecordsFetcher();
    }

    toastFromChildHandler() {
        let title = 'Successfully updated.';
        let message = 'Member Details record is successfully updated.';
        let variant = 'success';
        this.showToast(title, message, variant);
        this.showLoadingSpinner = false;
    }

    //this method works when submit button is clicked on record edit form.
    submitHandler() {
        this.showLoadingSpinner = true;
        this.recordEditCloseHandler();
    }

    recordEditCloseHandler() {
        this.displayEditForm = false;
    }

    //edit button method for future use
    handleEdit() {
        this.displayEditForm = true;
    }

    //This method is fired when user click submit button on the member detail record edit form to start spinner.
    memberdetaileditformsubmitbutton() {
        this.showLoadingSpinner = true;
    }

    //This method is used to open dropdown on clicking send email button to input mail Id 
    handleVisibility() {
        if (this.isvisible === false)
            this.isvisible = true;
        else
            this.isvisible = false
    }

    //This method is used to handle input value of email Id 
    handleEmailId(event) {
        this.MailId = event.target.value;
    }

    //for viewing member details.
    handleView(recId) {
        this.displayViewForm = true;
        this.memberDetaildataToSend = this.memberDetailData.filter(row => row.Project__c === recId);
        if (this.memberDetaildataToSend[0]) {
            this.viewTemplateSwitcher = true;
        }
        else {
            this.viewTemplateSwitcher = false;
        }
    }

    //This method is used to close the display view form. 
    modalCloseHandler() {
        this.displayViewForm = false;
        log('close modal fire');
    }

    fieldsAndRecordsFetcher() {
        let firstTimeEntry = false;
        let firstFieldAPI;
        let firstTimeEntryForSecondObj = false;

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
                //retrieve listOfRecords from the map
                let listOfRecords = JSON.parse(Object.values(mapOfFieldAndRecords)[2]);
                let memberDetailFields = JSON.parse(Object.values(mapOfFieldAndRecords)[1]);
                this.listOfMemberDetailFields = memberDetailFields;
                //This is used to fetch the Second object records.
                let memberDetailRecords = JSON.parse(Object.values(mapOfFieldAndRecords)[0]);
                this.memberDetailData = JSON.parse(Object.values(mapOfFieldAndRecords)[0]);
                let items = []; //local array to prepare columns for ProjectObject.
                let itemsForMemberDetails = []; //local array to prepare columns for Member detail Object.

                /*if user wants to display first column has hyperlink and clicking on the link it will
                naviagte to record detail page. Below code prepare the first column with type = url
                */
                let entryCount = 1;
                listOfFields.map(element => {
                    //it will enter this if-block just once to create first column record as hyperlink.
                    if (this.firstColumnAsRecordHyperLink !== null && this.firstColumnAsRecordHyperLink === 'Yes'
                        && firstTimeEntry === false) {
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
                        entryCount++;
                    } //This is used to make first column sortable when hyperlink option in selected NO.
                    else if (entryCount === 1) {
                        items = [...items, {
                            label: element.label,
                            fieldName: element.fieldPath,
                            sortable: true
                        }];
                        entryCount++;
                    }
                    else if (entryCount === 2) {
                        items = [...items, {
                            label: 'PC/PM Name',
                            fieldName: 'PCPM_Name'
                        }];
                        entryCount++;
                    }
                    else if (entryCount === 3) {
                        items = [...items, {
                            label: 'TL Manager',
                            fieldName: 'Manager_Name'
                        }];
                        entryCount++;
                    }
                    else {
                        items = [...items, {
                            label: element.label,
                            fieldName: element.fieldPath
                        }];
                        entryCount++;
                    }

                });

                //This method is used to fetch columns of second object.
                memberDetailFields.map(element => {
                    if (firstTimeEntryForSecondObj === false) {
                        itemsForMemberDetails = [...itemsForMemberDetails, {
                            label: element.label,
                            fieldName: 'Member_Name'
                        }];
                        firstTimeEntryForSecondObj = true;
                    } else {
                        itemsForMemberDetails = [...itemsForMemberDetails, {
                            label: element.label,
                            fieldName: element.fieldPath
                        }];
                    }
                });
                let rowAction = { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'right' } };

                items.push(rowAction);
                itemsForMemberDetails.push(rowAction);
                //finally assigns item array to columns
                this.columns = items;
                this.columnHeader = items;
                this.memberDetailColumns = itemsForMemberDetails;

                // this.tableData = listOfRecords;    // commented by ayush 
                this.initialData = listOfRecords;   // by ayush - intial data will contain all the entire data
                this.availableData = listOfRecords;     // by ayush - available data will contain per page data
                this.totalRecordsFetched = listOfRecords.length;
                this.bindingProjectRecordsWithCustomFieldName(firstFieldAPI, listOfRecords); //called by ayush
                if(this.memberDetailData && this.initialData){
                    this.showDatatable = true;
                }

                if (this.memberDetailData) {
                    let Member_Name;
                    this.memberDetailData = memberDetailRecords.map(member => {
                        Member_Name = member.Member__r.Name;
                        return { ...member, Member_Name };
                    });
                }
                this.showLoadingSpinner = false;
            })
            .catch(error => {
                this.error = error;
                this.initialData = undefined;
                this.memberDetailData = undefined;
            })
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    //---------------------------------------------------------------------------------------------------------------
    //     AYUSH
    bindingProjectRecordsWithCustomFieldName(firstFieldAPI, listOfRecords) {
        let PCPM_Name;
        let Manager_Name = '';
        if (this.firstColumnAsRecordHyperLink !== null && this.firstColumnAsRecordHyperLink === 'Yes') {
            let URLField;
            //retrieve Id, create URL with Id and push it into the array
            this.initialData = listOfRecords.map(item => {
                URLField = '/lightning/r/' + this.objectApiName + '/' + item.Id + '/view';
                if ('PC_PM_Name__r' in item) {
                    PCPM_Name = item.PC_PM_Name__r.Name;
                }
                if ('TL_Manager__r' in item) {
                    Manager_Name = item.TL_Manager__r.Name;
                }
                return { ...item, URLField, PCPM_Name, Manager_Name };
            });

            //now create final array excluding firstFieldAPI
            //this.initialData = this.initialData.filter(item => item.fieldPath != firstFieldAPI);
            this.paginationHanlder('', this.initialData);
        }
        else {
            this.initialData = listOfRecords.map(item => {
                if ('PC_PM_Name__r' in item) {
                    PCPM_Name = item.PC_PM_Name__r.Name;
                }
                if ('TL_Manager__r' in item) {
                    Manager_Name = item.TL_Manager__r.Name;
                }
                return { ...item, PCPM_Name, Manager_Name };
            });
            this.paginationHanlder('', this.initialData);
        }
    }

    get options() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
            { label: '20', value: '20' },
            { label: '25', value: '25' },
            { label: '30', value: '30' },
        ];
    }

    get disablePrevious() {
        return this.currentPage <= 1
    }

    get disableNext() {
        return this.currentPage >= this.totalPage
    }

    get disableFirst(){
        return this.currentPage == 1
    }

    get disableLast(){
        return this.currentPage == this.totalPage
    }

    sortHandler(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        if (this.searchKey) {
            this.sortData(this.sortBy, this.sortDirection, this.searchedData);
        }
        else {
            this.sortData(this.sortBy, this.sortDirection, this.initialData);
        }

    }

    sortData(sortBy, sortDirection, data) {
        let parseData = data;
        let keyValue = (a) => {
            return a[sortBy];
        };
        let isReverse = sortDirection === 'asc' ? 1 : -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        if (!this.searchKey) {
            this.initialData = parseData;
        }
        if (this.searchKey) {
            this.paginationHanlder('', this.searchedData);
        }
        else {
            this.paginationHanlder('', this.initialData);
        }

    }

    get showPagination(){
        return this.totalPage===1;
    }

    paginationHanlder(event, tempData) {
        try {
            if (tempData) {
                this.totalRecords = tempData;
            }
            else if (this.searchKey) {
                this.totalRecords = this.searchedData;
            }
            else {
                this.totalRecords = this.initialData;
            }
            this.totalPage = Math.ceil(this.totalRecords.length / this.recordSize)
            if (event) {
                if (event.target.name === 'first') {
                    this.currentPage = 1;
                }
                else if (event.target.name === 'previous') {
                    if (this.currentPage > 1) {
                        this.currentPage = this.currentPage - 1
                    }
                }
                else if (event.target.name === 'next') {
                    if (this.currentPage < this.totalPage) {
                        this.currentPage = this.currentPage + 1
                    }
                }
                else if (event.target.name === 'last') {
                    this.currentPage = this.totalPage;
                }
            }
            const start = (this.currentPage - 1) * this.recordSize
            const end = this.recordSize * this.currentPage
            this.availableData = this.totalRecords.slice(start, end)
        }

        catch (err) {
            console.log('error is----- ', JSON.stringify(err));
        }
    }

    handleChange(event) {
        this.recordSize = event.detail.value;

        if (this.searchKey) {
            this.handleSearch('');
        }
        else {
            this.paginationHanlder('', this.initialData);
        }
    }

    handleSearch(event) {
        if (event) {
            this.searchKey = event.target.value.toLowerCase();
            let strRegex = new RegExp(/^[a-z0-9 ]+$/i);
            let result = strRegex.test(this.searchKey);
            if (result || this.searchKey === '') {
                this.maxInput = 255;
                this.searchKeyErrorMessage = ' ';
            }
            else {
                this.maxInput = this.searchKey.length-1;
                this.searchKeyErrorMessage = 'Please enter only alphabets or numbers.';
            }
        }

        if (this.searchKey) {
            if (this.initialData) {
                let recs = [];
                for (let rec of this.initialData) {
                    let valuesArray = Object.values(rec);
                    for (let val of valuesArray) {
                        let strVal = String(val);  // let strVal = String( rec.Name );
                        if (strVal) {
                            if (strVal.toLowerCase().includes(this.searchKey)) { //if ( strVal.toLowerCase().startsWith( this.searchKey ) ) {
                                recs.push(rec);
                                break;
                            }
                        }
                    }
                }
                this.availableData = recs;
                this.searchedData = recs;
                this.paginationHanlder('', this.searchedData);
            }
        }
        else {
            this.paginationHanlder('', this.initialData);
        }
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------
    //                 KAVYA
    getSelectedRec() {
        try {
            this.lstSelectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
            //this.downloadIconForProject = true;

            if (Object.is(this.lstSelectedRecords, null) === false && this.lstSelectedRecords.length > 0) {

                let lstOfRecordsOfExlFile = [{}];
                lstOfRecordsOfExlFile = JSON.parse(JSON.stringify(this.lstSelectedRecords));

                let doc = '<table>';
                doc += '<style>';
                doc += 'table, th, td {';
                doc += ' border: 1px solid black;';
                doc += ' border-collapse: collapse;';
                doc += '}';
                doc += '</style>';
                doc += '<tr>';
                let arrOfHeaders = [];
                arrOfHeaders = JSON.parse(JSON.stringify(this.columnHeader))

                for (let i = 0; i < arrOfHeaders.length - 1; i++) {
                    doc += '<th>' + arrOfHeaders[i].label + '</th>';

                }
                doc += '<th>' + 'Member Name' + '</th>';

                doc += '</tr>';
                for (let j = 0; j < lstOfRecordsOfExlFile.length; j++) {
                    doc += '<tr>';
                    var record = lstOfRecordsOfExlFile[j];
                    doc += '<th>' + record.Name + '</th>';

                    //for (let i = 0; i < this.listOfFieldsFromFieldset.length; i++) {
                    for (let i = 1; i < arrOfHeaders.length - 1; i++) {
                        //  var fields = this.listOfFieldsFromFieldset[i].fieldPath;
                        var fields = arrOfHeaders[i].fieldName;
                        if (record[fields] === undefined) {
                            doc += '<th>' + null + '</th>';
                        }
                        else {
                            doc += '<th>' + record[fields] + '</th>';
                        }
                    }
                    let listOfMembers = '';
                    let arrayOfMemberDetail = [{}];
                    arrayOfMemberDetail = JSON.parse(JSON.stringify(this.memberDetailData));

                    arrayOfMemberDetail.forEach(element => {
                        if (element.Project__c == record.Id) {
                            listOfMembers += element.Member__r.Name + '<br/>';
                        }
                    })

                    if (listOfMembers == '') {
                        doc += '<th>' + null + '</th>';

                    }
                    else {
                        listOfMembers = listOfMembers.slice(0, -2);
                        doc += '<th>' + listOfMembers + '</th>';
                    }

                }
                doc += '</tr>'
                doc += '</table>';
                var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
                let downloadElement = document.createElement('a');
                downloadElement.href = element;
                downloadElement.target = '_self';
                // use .csv as extension on below line if you want to export data as csv
                downloadElement.download = 'Project Data.xls';
                document.body.appendChild(downloadElement);
                downloadElement.click();
                let title = 'Success';
                let message = 'Successfully Downloaded Project Details';
                let variant = 'success';
                this.showToast(title, message, variant);
                // this.dispatchEvent(new ShowToastEvent({title:'Success', message:'Successfully Downloaded Project Details' , variant:'success' }));
            }
            else {
                let title = 'File not selected';
                let message = 'Please Select A Row to download details';
                let variant = 'error';
                this.showToast(title, message, variant);
            }
        }
        catch (error) {
            let title = 'Error while downloading Email';
            let message = error.body.message;
            let variant = 'error';
            this.showToast(title, message, variant);
            // this.dispatchEvent(new ShowToastEvent({title:, message:error.body.message, variant:'error'}));
        }
    }

    // ----------------------------------------------------------------------------------------------------------------------------------------------
    //      PRERNA

    handleEmailValidation() {
        var flag = true;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = this.template.querySelector('[data-id="txtEmailAddress"]');
        let emailVal = email.value;
        if (emailVal.match(emailRegex)) {
            email.setCustomValidity("");

        } else {
            flag = false;
            email.setCustomValidity("Please enter valid email");
        }
        email.reportValidity();
        return flag;
    }

    sendMail() {
        if(this.handleEmailValidation()){
            this.lstSelectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
            this.isvisible = false;
            let lstOfRecordsOfExlFile = JSON.parse(JSON.stringify(this.lstSelectedRecords));
            let arrayOfMemberDetail = [{}];
            var DetailInObj = {};
            arrayOfMemberDetail = JSON.parse(JSON.stringify(this.memberDetailData));
            for (let j = 0; j < lstOfRecordsOfExlFile.length; j++) {

                var record = lstOfRecordsOfExlFile[j];
                let membersList = [];
                arrayOfMemberDetail.forEach(element => {
                    if (element.Project__c == record.Id && !membersList.includes(element.Member__r.Name)) {
                        membersList.push(element.Member__r.Name);
                    }
                })
                arrayOfMemberDetail.forEach(element => {
                    if (element.Project__c == record.Id) {
                        let projId = element.Project__c;
                        if (!DetailInObj[element.Project__c]) {
                            DetailInObj[projId] = JSON.stringify(membersList);
                        }
                    }

                })
        }
        this.membersMap = JSON.stringify(DetailInObj);
        this.mailDetails();
        this.MailId = '';
        }
        else{
            let title = 'Invalid Email Id';
                    let message = 'Please enter valid email Id';
                    let variant = 'error';
                    this.showToast(title, message, variant);
        }
    }

    mailDetails() {
        //if (this.lstSelectedRecords != null && this.lstSelectedRecords.length > 0 && !this.membersMap.isEmpty() && !this.MailId.isEmpty() && this.MailId != '' && this.columnHeader != null) {
            sendXmlEmail({ projectData: this.lstSelectedRecords, emailId: this.MailId, fieldlist: JSON.stringify(this.columnHeader), memberDetail: this.membersMap })
                .then(result => {
                    let title = 'Success';
                    let message = 'Successfully Sent Email';
                    let variant = 'success';
                    this.showToast(title, message, variant);
                    // this.dispatchEvent(new ShowToastEvent({title:'Success', message:'Successfully Sent Email' , variant:'success' }));
                })
                .catch(error => {
                    let title = 'Error while Sending Email';
                    let message = error.body.message;
                    let variant = 'error';
                    this.showToast(title, message, variant);
                    // this.dispatchEvent(new ShowToastEvent({title:'Error while Sending Email', message:error.body.message, variant:'error'}));
                })
        //}
    }
}