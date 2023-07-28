import { LightningElement, track, wire, api } from 'lwc';
// importing Custom Label
import ModalHeaderForRecordEditForm from '@salesforce/label/c.ModalHeaderForRecordEditForm';
import ModalHeaderForMemberDetailDatatable from '@salesforce/label/c.ModalHeaderForMemberDetailDatatable';
import RecordViewFormModalHeader from '@salesforce/label/c.RecordViewFormModalHeader';
import sendXmlEmailForMembers from '@salesforce/apex/ProjectDatatableHelper.sendXmlEmailForMembers'

//importing static resource
import myResource from '@salesforce/resourceUrl/ImageForMember';
import NameOfProject from '@salesforce/label/c.NameOfProject';
import realUsedHours from '@salesforce/label/c.Real_Used_Hours_in_project_and_member_object';
import totalHours from '@salesforce/label/c.To_show_Billing_hours_in_project_and_member';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ViewModalForMemberDetails extends LightningElement {
    @api columns;   //columns for List of fields datatable
    @api tableData;   //data for list of fields datatable of Project object.
    @api objectApiName; //kind of related list object API Name e.g. 'Opportunity'
    @api viewTemplateSwitcher;
    @api listOfMemberDetailFields;
    @api yearsFromParent;
    @api monthFromParent;
    @track modalHeaderForRecordEditForm = ModalHeaderForRecordEditForm;
    @track modalHeaderForMemberDetailDatatable = ModalHeaderForMemberDetailDatatable;
    @track recordViewFormModalHeader = RecordViewFormModalHeader;
    @track IsActive = false;
    @track year = 'None';
    @track month = 'None';
    @track memberDetailDataToDisplay;

    @api projectRowData; // Entire row data of project
    projectName = '';
    projectTotalHours
    projectRealUsedHours;
    @api memberDetailList;
    @api projectDetailList;
    //to passed in record edit form.
    recordId;

    displayEditForm = false;
    isDatatable = true; //because at first we need to show datatable.
    displayViewForm = false;
    label = {
        realUsedHours,
        totalHours,
        NameOfProject,
    };


    //for displaying members in grid format
    isGrid = true;
    coverImage = myResource;
     isvisible = false;
    MailId;

    connectedCallback() {
        this.projectName = JSON.parse(JSON.stringify(this.projectRowData.Name));
        this.projectTotalHours = Number(JSON.stringify(this.projectRowData.Total_Hours__c));
        this.projectRealUsedHours = Number(JSON.stringify(this.projectRowData.Real_Used_Hours__c));
        this.memberDetailDataToDisplay = this.tableData;
    }

    //This method is used to fire an event to close the member detail view form.
    modalCloseHandler(event) {
        const selectEvent = new CustomEvent('closemodal');
        this.dispatchEvent(selectEvent);
    }
    //This function is used to close the view modal for Member details object.
    closeModalForViewHandler() {
        this.displayViewForm = false;
        this.isDatatable = true;
    }

    callRowAction(event) {
        const recId = event.detail.row.Id;
        if (recId !== undefined) {
            this.recordId = recId;
            const actionName = event.detail.action.name;
            if (actionName === 'Edit') {
                //this.handleAction(recId, 'edit');
                this.handleEdit();
            }
            else if (actionName === 'View') {
                this.handleView(recId);
            }
        }
        else {
            // console.log('METHOD CALL FOR GRID MEMBER');
        }
    }

    //edit button method for future use
    handleEdit() {
        this.displayEditForm = true;
        this.isDatatable = false;
    }

    //This method is used to close the modal for member detail record edit form.
    recordEditCloseHandler() {
        this.displayEditForm = false;
        this.isDatatable = true;
        // const successToast = new CustomEvent('successtoastmessage');
        // this.dispatchEvent(successToast);
        //this.modalCloseHandler();
    }

    handleSuccess(event) {
        //this.recordId = event.detail.id;
        const successToast = new CustomEvent('successtoastmessage');
        this.dispatchEvent(successToast);
    }

    //This method is used to view the record of member detail when user clock on rowaction view button.
    handleView(recId) {
        this.recordId = recId;
        this.displayViewForm = true;
        this.isDatatable = false;
    }

    //This method is fired when user click submit button on member detail recod edit modal.
    submitHandler() {
        const fireEvent = new CustomEvent('memberdetaileditformsubmitbutton');
        this.dispatchEvent(fireEvent);

        //for modal closing
        this.modalCloseHandler();
    }

    //-----kavya--------------------------------------------------------------------------
    changeView(event) {
        if (event.target.checked) {
            this.IsActive = true;
            // this.handleListView();
            if (this.isGrid == true)
                this.isGrid = false;

        } else {
            this.IsActive = false;
            this.isGrid = true;
            //   this.handleGridView();
        }
    }

    callEditfun(event) {
        var recId = event.currentTarget.dataset.id;
        if (recId !== undefined) {
            this.recordId = recId;
            this.handleEdit();
        }
        else {
            // console.log('METHOD CALL FOR GRID MEMBER');
        }
    }

    callViewfun(event) {
        const recId = event.currentTarget.dataset.id;
        if (recId !== undefined) {
            this.handleView(recId);
        }
    }

    handleChangeForYear(event) {
        this.year = event.detail.value;
        this.methodToFilterMembers(this.year, this.month, this.tableData);

    }

    handleChangeForMonth(event) {
        this.month = event.detail.value;
        this.methodToFilterMembers(this.year, this.month, this.tableData);
    }

    methodToFilterMembers(year, month, memberdetailDataToFilter) {
        let memberDetailDataToIterate = JSON.parse(JSON.stringify(memberdetailDataToFilter));

        if (JSON.parse(JSON.stringify(memberdetailDataToFilter)).length > 0) {
            if (year != null && year != 'None' && (month == null || month == 'None')) {
                let filteredArrayOfMemberDetail = memberDetailDataToIterate.reduce((acc, record) => {
                    if (record.Year__c == year && !acc.includes(record.id)) {
                        acc.push(record);
                    }
                    return acc;
                }, []);
                this.memberDetailDataToDisplay = filteredArrayOfMemberDetail;
                if (filteredArrayOfMemberDetail.length == 0) {
                    let title = 'No Records.';
                    let message = 'No Member detail records are present for the selected year. Please try again with another year.';
                    let variant = 'error';
                    this.showToast(title, message, variant);
                }
                if (filteredArrayOfMemberDetail.length > 0) {
                    let title = 'Records available.';
                    let message = 'There are ' + filteredArrayOfMemberDetail.length + ' Member detail records are present for the selected year ' + year;
                    let variant = 'success';
                    this.showToast(title, message, variant);
                }
            }
            else if ((year == null || year == 'None') && month != null && month != 'None') {
                let filteredArrayOfMemberDetail = memberDetailDataToIterate.reduce((acc, record) => {
                    if (record.Month__c == month && !acc.includes(record.id)) {
                        acc.push(record);
                    }
                    return acc;
                }, []);
                this.memberDetailDataToDisplay = filteredArrayOfMemberDetail;
                if (filteredArrayOfMemberDetail.length == 0) {
                    let title = 'No Records.';
                    let message = 'No Member detail records are present for the selected month. Please try again with another month.';
                    let variant = 'error';
                    this.showToast(title, message, variant);
                }
                if (filteredArrayOfMemberDetail.length > 0) {
                    let title = 'Records available.';
                    let message = 'There are ' + filteredArrayOfMemberDetail.length + ' Member detail records are present for the selected month ' + month;
                    let variant = 'success';
                    this.showToast(title, message, variant);
                }
            }
            else if ((year != null && year != 'None') && (month != null && month != 'None')) {
                let filteredArrayOfMemberDetail = memberDetailDataToIterate.reduce((acc, record) => {
                    if (record.Year__c == year && record.Month__c == month && !acc.includes(record.id)) {
                        acc.push(record);
                    }
                    return acc;
                }, []);
                this.memberDetailDataToDisplay = filteredArrayOfMemberDetail;
                if (filteredArrayOfMemberDetail.length == 0) {
                    let title = 'No Records.';
                    let message = 'No Member detail records are present for the selected year & month. Please try again with another entry.';
                    let variant = 'error';
                    this.showToast(title, message, variant);
                }
                if (filteredArrayOfMemberDetail.length > 0) {
                    let title = 'Records available.';
                    let message = 'There are ' + filteredArrayOfMemberDetail.length + ' Member detail records are present for the selected year ' + year + ' month ' + month;
                    let variant = 'success';
                    this.showToast(title, message, variant);
                }
            }
            else {
                this.memberDetailDataToDisplay = memberdetailDataToFilter;
            }
        }
        else {
            let title = 'No Records.';
            let message = 'No Member detail records are present.';
            let variant = 'error';
            this.showToast(title, message, variant);
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    getSelectedRecForMemberDetail() {
        try {
            this.selectedRcordsToDownload = this.template.querySelector("lightning-datatable").getSelectedRows();
            if (this.selectedRcordsToDownload.length > 0) {

                let lstOfRecordsOfExlFileforMemeberDetails = [{}];
                lstOfRecordsOfExlFileforMemeberDetails = JSON.parse(JSON.stringify(this.selectedRcordsToDownload));
                let doc = '<table>';
                doc += '<style>';
                doc += 'table, th, td {';
                doc += '    border: 1px solid black;';
                doc += '    border-collapse: collapse;';
                doc += '}';
                doc += '</style>';
                // Add all the Table Headers
                doc += '<tr>';
                let arrOfHeaders = [{}];
                arrOfHeaders = JSON.parse(JSON.stringify(this.columns))
                for (let i = 0; i < arrOfHeaders.length - 1; i++) {
                    doc += '<th>' + arrOfHeaders[i].label + '</th>';
                }
                doc += '</tr>';
                for (let j = 0; j < lstOfRecordsOfExlFileforMemeberDetails.length; j++) {
                    doc += '<tr>';
                    var record = lstOfRecordsOfExlFileforMemeberDetails[j];
                    let objectForFields = [];
                    for (let i = 0; i < arrOfHeaders.length - 1; i++) {
                        var fields = arrOfHeaders[i].fieldName;
                        if (record[fields] === undefined) {
                            doc += '<th>' + null + '</th>';
                        } else {
                            doc += '<th>' + record[fields] + '</th>';
                        }

                    }
                }
                doc += '</table>';
                var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
                let downloadElement = document.createElement('a');
                downloadElement.href = element;
                downloadElement.target = '_self';
                // use .csv as extension on below line if you want to export data as csv
                downloadElement.download = this.projectName+' Data.xls';
                document.body.appendChild(downloadElement);
                downloadElement.click();
                let title = 'Success';
                let message = 'Successfully Downloaded Member Details';
                let variant = 'success';
                this.showToast(title, message, variant);
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
        }
    }

    // =========================================================================================================================
    //   Changes by Prerna Jhingran


     //This method is used to open dropdown on clicking send email button to input mail Id 
    handleVisibility() {
        if (this.isvisible == false)
            this.isvisible = true;
        else
            this.isvisible = false
    }

    //This method is used to handle input value of email Id 
    handleEmailId(event) {
        this.MailId = event.target.value;
    }
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
             this.lstSelectedRecords1 = this.template.querySelector("lightning-datatable").getSelectedRows();
            this.isvisible = false;
            if (this.lstSelectedRecords1 != null && this.lstSelectedRecords1.length > 0  && this.columns != null)
            {
                sendXmlEmailForMembers({ projectData: this.lstSelectedRecords1, emailId: this.MailId, fieldlist: JSON.stringify(this.columns) })
                .then(result => {
                    let title = 'Success';
                        let message = 'Successfully Sent Email';
                        let variant = 'success';
                        this.showToast(title, message, variant);
                })
                .catch(error => {
                    let title = 'Error while Sending Email';
                        let message = error.body.message;
                        let variant = 'error';
                        this.showToast(title, message, variant);
                })
            }
         }
         else{
            let title = 'Invalid Email Id';
            let message = 'Please enter valid email Id';
            let variant = 'error';
            this.showToast(title, message, variant);
        }
    }
}