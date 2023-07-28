import { LightningElement , wire} from 'lwc';
import fetch1 from '@salesforce/apex/LwcQuestion_2.fetch1';

export default class Question2 extends LightningElement {

    Accounts;
    error;

    @wire(fetch1)
    wiredAccounts({ data, error }) {
        if (data) {
            this.Accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.Accounts = undefined;
        }
    }
}