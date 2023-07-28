import { LightningElement, api, track } from 'lwc';
import method from '@salesforce/apex/LwcBrainstorming.method';

export default class Brainstorming2 extends LightningElement {
    @api recordId;
    @track name;
    @track results;

    handleChange(event){
        this.name = event.target.value;
    }

    CalBonus(){
        method({oId : this.recordId, name: this.name})
        .then(result => {
            this.results = result;
            //console.log(result);
            this.showToast();
        })
        .catch(error => {
            console.log(error);
        })
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Congratulations !',
            message: `Your bonus has been updated with ${this.results}`,
        });
        this.dispatchEvent(event);
    }
}