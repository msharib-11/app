/**
 * @description       : 
 * @author            : Mohd Sharib
 * @group             : 
 * @last modified on  : 07-24-2023
 * @last modified by  : Aditya Kumar Yadav
**/
import { LightningElement, track, api } from 'lwc';
import FieldsName from '@salesforce/apex/RecordCreationTM.getFields'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class CreateRecordDynamically extends LightningElement {
    @track fields;
    @api recordId = '';
    @api objName;
    @api fsetName;
    @api objLabel;
    connectedCallback() {
        FieldsName({ objectName: this.objName, fieldSetName: this.fsetName })
            .then(result => {
                this.fields = result;
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleCancel() {
        const cancelEvent = new CustomEvent('cancelcustomevent', {
            //
        });
        this.dispatchEvent(cancelEvent);
    }

    handleSuccess() {
        const saveEvent = new CustomEvent('savecustomeventbtn', {
        })
        this.dispatchEvent(saveEvent);
    }

    handleError(event) {
        if (event.detail.detail.includes('duplicate value found:')) {
            this.showToast('Matching CA_ID found', 'Member Already present with same CA ID', 'Error');

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
}