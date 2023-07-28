import { LightningElement, track } from 'lwc';

export default class Task2Body extends LightningElement {
    @track searchVal;
    @track editbuttonvalue;
    @track contactRecord = true;
    @track userInfo = false;

    // @track dashBoard = true;

    getValue(event){
        this.searchVal = event.detail;
        // console.log('parent>>>>>>>>>>>>',this.searchVal);

        if(this.searchVal == 'ConInfo'){
            this.contactRecord = true;
            this.userInfo = false;
            // this.dashBoard = false;
        }
        else if(this.searchVal == 'UserInfo'){
            this.contactRecord = false;
            this.userInfo = true;
            // this.dashBoard = false;
        }
    }

    getBtnValue(event){
        this.editbuttonvalue = event.detail;
        console.log('parent edit>>>>',this.editbuttonvalue);
        this.userInfo = true;
        this.contactRecord = false;
        
        if(this.editbuttonvalue == 'action'){
            this.setvalue = true;
        }
    }

    @track setvalue;

    getbackvalue(event){
        this.setvalue = event.detail;
    }
}