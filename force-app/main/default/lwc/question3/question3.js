import { api, LightningElement, track } from 'lwc';
import func from '@salesforce/apex/lwcQuestion3.func';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Question3 extends LightningElement {
    @track cDate;
    @api recordId;

    handleChange(event){
        this.cDate = event.target.value;
    }

    updateOpp(){
        func({
            oId:this.recordId, 
            cDate: this.cDate
        })
        .then(result =>{
            this.showToast();
        })
        .catch(error => {

        })
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Congratulations !',
            message: 'Oppostunity closed Date has been updated',
        });
        this.dispatchEvent(event);
    }

}