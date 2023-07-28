import { LightningElement, track, wire } from 'lwc';
import methodName from '@salesforce/apex/lwcQuestion4.methodName';

export default class Question4 extends LightningElement {
    @track col = [{
        label: 'Account name',
        fieldName: 'Name',
        sortable: true
    },
    {
        label: 'Type',
        fieldName: 'Type',
    },
    {
        label: 'Rating',
        fieldName: 'Rating',
    }];

    @track error;
    @track acList;
    @wire (methodName)
    wAcc({
        error, 
        data
    })
    {
        if(data) {
            this.acList = data;
        }
        else if(error){
            this.error = error;
        }
    }

    // searching
    searchKey;
    @track acList;

    handelSearchKey(event){
        this.searchKey = event.target.value;
    }

    SearchAccountHandler(){
        getacc({key: this.searchKey})
        .then(result => {
            this.acList = result;
        })
        .catch(error =>{
            this.acList = NULL;
        });
    }
    col = [
        {label:'Account Name', fieldName:'Name' } ,
        {label:'Phone', fieldName:'Phone' } ,
        {label:'Industry', fieldName:'Industry' }
              
    ]
}