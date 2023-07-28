import { LightningElement, track } from 'lwc';

export default class Task2Navbar extends LightningElement {

    handleAllRecords(event){
        const recordStatus = event.currentTarget.getAttribute("data-id");
        // console.log('Child>>>>>>>', searchValue);
        // console.log('Child>>>>>>>>>>>>>>>>',recordStatus);
        const recordEvent = new CustomEvent("getrecordstatus", {detail: recordStatus});
        this.dispatchEvent(recordEvent);
    }
}