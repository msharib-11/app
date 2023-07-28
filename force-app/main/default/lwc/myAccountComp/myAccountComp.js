import { LightningElement,track,wire } from 'lwc';
import getAcc from '@salesforce/apex/myAccountClass.getAcc';

export default class MyAccountComp extends LightningElement {
    @track searchKey;
    @wire(getAcc, {text: '$searchKey'}) Account;
    handleChange(event){
        this.searchKey = event.target.value;
    }
}