import { LightningElement, track, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveDataAcc from '@salesforce/apex/FormControllerClass.saveDataAcc';
import saveDataCon from '@salesforce/apex/FormControllerClass.saveDataCon';
import accName from '@salesforce/schema/Account.Name';
import accDate from '@salesforce/schema/Account.Created_Date__c';
import accDateTime from '@salesforce/schema/Account.Created_date_time__c';
import accValid from '@salesforce/schema/Account.isValid__c';
import accActive from '@salesforce/schema/Account.Active__c';
import accWorkingIn from '@salesforce/schema/Account.Working_in__c'

import conLastName from '@salesforce/schema/Contact.LastName';
import conBirthdate from '@salesforce/schema/Contact.Birthdate';
import conCreationDateTime	from '@salesforce/schema/Contact.Creation_date_time__c';
import conValid from '@salesforce/schema/Contact.isValidCon__c';
import conActive from '@salesforce/schema/Contact.ActiveCon__c';
import workingcon from '@salesforce/schema/Contact.Working_con_in__c';

export default class TeamTask1 extends LightningElement {
    @api objectApiName;
    @track res;
    @track showForm = true;
    @track curUrl = window.location.href;
    @track searchpara = new URLSearchParams(this.curUrl.substring(this.curUrl.indexOf('?')));
    @track searchVal = this.searchpara.get('c__val');
    @track searchObj = this.searchpara.get('c__object');

    connectedCallback(){
        if(this.searchVal == 'false'){
            return null;
        }
        else { 
            sessionStorage.setItem('previousTab', window.location.href);
            window.open(this.curUrl, this.searchpara.set("c__val", "false"));

            window.history.back();

            window.onunload =()=>{
                var previousTaburl = sessionStorage.getItem('previousTab');
                window.opener.location.reload();
            }
        }
    }

    @track accObject = {
        Name:accName,
        Created_Date__c:accDate,
        Created_date_time__c:accDateTime,
        isValid__c:accValid,
        Active__c:accActive,
        Working_in__c:accWorkingIn
    };

    //@track 

    @track conObject = {
        LastName:conLastName,
        Birthdate:conBirthdate,
        Creation_date_time__c:conCreationDateTime,
        isValidCon__c:conValid,
        ActiveCon__c:conActive,
        Working_con_in__c:workingcon
    };

    // strConObj = JSON.stringify(this.conObject);

    // Function for saving the Records
    handleSave(){
        // console.log('in account');
        // console.log('this.searchObj >>>>>>>> ',this.searchObj);
        if(this.searchObj == 'Account'){
            // const strAccObj = JSON.stringify(this.accObject);
            // console.log('strAccObj >>>>>>>>> ',strAccObj);
            // saveDataAcc({obj: strAccObj, objName: this.searchObj})
            console.log(JSON.stringify(this.accObject));
            saveDataAcc({acc: this.accObject})
            .then(result =>{      
                console.log({result});         
                this.showToast('Successful', 'Record is inserted', 'Success', 'dismissible');
                window.history.back();
                setTimeout(() => {
                    window.close();
                }, 2000);
            })
            .catch(error =>{
                this.showToast('Failed', 'Record is not inserted', 'error', 'dismissible');
            })
        }
        else {
            console.log(JSON.stringify(this.conObject));
            saveDataCon({con: this.conObject})
            .then(result => {
            console.log({result});
                this.showToast('Successful', 'Record is inserted', 'Success', 'dismissible');
                window.history.back();
                setTimeout(() => {
                    window.close();
                }, 2000);
            })
            .catch(error => {
                this.showToast('Failed', 'Record is not inserted', 'error', 'dismissible');
            })
        }
    }


    // tracking the value of Name
    handleChangeName(event){
        if (this.searchObj == 'Account') {
            this.accObject.Name = event.target.value;
        }
        else {
            this.conObject.LastName = event.target.value;
        }
    }

    // tracking the value of date time 
    handleChangeDate(event){
        if (this.searchObj == 'Account') {
            this.accObject.Created_Date__c = event.target.value;
        }
        else {
            this.conObject.Birthdate = event.target.value;
        }
    }

    // tracking the value of date time 
    handleChangeDatetime(event){
        if (this.searchObj == 'Account') {
            this.accObject.Created_date_time__c = event.target.value;
        }
        else {
            this.conObject.Creation_date_time__c = event.target.value;
        }
    }

    // tracking the value of checkbox
    handleChangeCheckbox(event){
        if (this.searchObj == 'Account') {
            this.accObject.isValid__c = event.target.checked;
        }
        else {
            this.conObject.isValidCon__c = event.target.checked;
        }
    }

    // tracking the values of pickList
    handleChangeActive(event){
        if (this.searchObj == 'Account') {
            this.accObject.Active__c = event.target.value;
        }
        else {
            this.conObject.ActiveCon__c = event.target.value;
        }
    }


    // tracking the value of multipicklist
    @track value;
    @track options= [
      { label: 'ASIA', value: 'ASIA' },
      { label: 'EMA', value: 'EMA' },
      { label: 'NA', value: 'NA' },
      { label: 'SA', value: 'SA' },
    ];
    @track allValues=[];
    @track optionsMaster=[
        { label: 'ASIA', value: 'ASIA' },
        { label: 'EMA', value: 'EMA' },
        { label: 'NA', value: 'NA' },
        { label: 'SA', value: 'SA' },
    ];
    handleMultiChange(event){
        this.value=event.target.value;
        if(!this.allValues.includes(this.value))
          this.allValues.push(this.value);
        this.modifyOptions();
        if(this.searchObj == 'Account'){
            this.accObject.Working_in__c = this.allValues;
        }
        else{
            this.conObject.Working_con_in__c = this.allValues;
        }
    }
    handleRemove(event){
        this.value='';
        const valueRemoved=event.target.name;
        this.allValues.splice(this.allValues.indexOf(valueRemoved),1);
        this.modifyOptions();
    }
    modifyOptions(){
        this.options=this.optionsMaster.filter(elem=>{
          if(!this.allValues.includes(elem.value))
            return elem;
        })
    }

    // For opening the html form by clicking and change the value to true
    handleButtonClick() {
        this.showForm = true;
    }

    // For cancel button
    handleCancel(){
        this.showForm = false;
        window.close();
    }

    // single toast message function 
    showToast(title, message, variant, mode){
        const event = new ShowToastEvent({title, message, variant, mode});
        this.dispatchEvent(event);
    }


    // for Showing Success and error messages
    // showSuccessToast() {
    //     const evt = new ShowToastEvent({
    //         title: 'Successful',
    //         message: 'Record is inserted ',
    //         variant: 'success',
    //         mode: 'dismissable'
    //     });
    //     this.dispatchEvent(evt);
    // }

    // showErrorToast() {
    //     const evt = new ShowToastEvent({
    //         title: 'failed',
    //         message: 'Some unexpected error',
    //         variant: 'error',
    //         mode: 'dismissable'
    //     });
    //     this.dispatchEvent(evt);
    // }
}