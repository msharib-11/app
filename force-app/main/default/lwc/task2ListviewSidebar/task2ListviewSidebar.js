import { LightningElement, track, api } from 'lwc';

export default class Task2ListviewSidebar extends LightningElement {
    @track setselectedItem = 'ConInfo';
    handleClick(event){
        this.setselectedItem = event.target.name;
        // console.log('selecteditem>>>>>>>', this.setselectedItem);
        const backValue = new CustomEvent("backval", {detail: false});
        this.dispatchEvent(backValue);
        this.custumFunctioncall();
    }

    custumFunctioncall(){
        const searchEvent = new CustomEvent("getvalue", {detail: this.setselectedItem});
        this.dispatchEvent(searchEvent);
    }


    @api 
    get setParentValue(){
        return null;
    }

    set setParentValue(value){
        if(value == true){
            this.setselectedItem = 'UserInfo';
            this.custumFunctioncall();
        }
    }
}