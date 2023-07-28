import { LightningElement, track, wire } from 'lwc';
import userDetail from '@salesforce/apex/Task2Contact.fetchUser'

export default class Task2Header extends LightningElement {
    @track Userobj;
    @track show = false;

    connectedCallback(){
        userDetail()
        .then(result =>{
            this.Userobj = result;
        })
    }

    showPopover(){
        if(this.show == false){
            this.show = true;
        }
        else if(this.show == true){
            this.show = false;
        }
    }

    handleEditButton(event){
        this.show = false;
        const buttonValue = event.target.title;
        console.log('child edit btn>>>>>>>',buttonValue);
        const EditbuttonValue = new CustomEvent("getbtnvalue", {detail: buttonValue});
        this.dispatchEvent(EditbuttonValue);
    }
}