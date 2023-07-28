import { LightningElement, track } from 'lwc';
import Create from '@salesforce/apex/lwcAccountCreate.Create';

export default class LwcCreateAccount extends LightningElement {
    @track name;
    @track Phone;
    @track AccountId;

    handleNameChange(event){
        this.Name = event.target.value;
    }

    handlePhoneChange(event){
        this.Phone = event.target.value;
    }

    createAccRec (){
        Create({
            n : this.Name,
            p : this.Phone
        })
        .then (message=>{
            this.AccountId = message.Id;
        })
        .catch (error => {
            this.error = error;
        })
    }
}