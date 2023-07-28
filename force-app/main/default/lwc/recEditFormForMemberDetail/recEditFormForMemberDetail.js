import { LightningElement, api } from 'lwc';

export default class RecEditFormForMemberDetail extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api listOfFieldsFromFieldset = [];
    @api modalHeaderForRecordEditForm = '';
    @api memberName;
    connectedCallback(){
        console.log('At line 10>>>>>>>..',JSON.stringify(this.memberName));
    }
    handleSuccess(event) {
        //this.recordId = event.detail.id;
        //this.fieldsAndRecordsFetcher();
        const successEvent = new CustomEvent('editsuccess');
        this.dispatchEvent(successEvent);
    }
    handleSubmit(event) {
        // console.log('onsubmit event recordEditForm'+ event.detail.fields);
        // this.displayEditForm = false;
        const selectEvent = new CustomEvent('submitmodal');  //closemodal
        this.dispatchEvent(selectEvent);
    }
    handleClose(){
        const selectEvent = new CustomEvent('closemodal');
        this.dispatchEvent(selectEvent);
    }
}