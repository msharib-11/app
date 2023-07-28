import { LightningElement, track } from 'lwc';
import Fetch from '@salesforce/apex/lwcQuestionSix.Fetch';

export default class Question6 extends LightningElement {
    @track us;
    @track pwd;
    @track ContactName
    handle1(event){
        this.us = event.target.value;
    }
    handle2(event){
        this.pwd = event.target.value;
    }

    Save (){
        Fetch({
            u : this.us,
            p : this.pwd
        })
        .then(result =>{
            this.ContactName = result.Name;
        })
        .catch(error =>{
            this.error = error;
        })
    }
}