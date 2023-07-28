import { LightningElement, track } from 'lwc';

export default class ButtonValueChange extends LightningElement {
    @track name = "abc";

    ChangeName = ()=>{
        this.name = "Mohd Sharib";
    }
}