import { LightningElement, track, wire } from 'lwc';
import userInform from '@salesforce/apex/Task2Contact.fetchUser';
// import getDomainName from '@salesforce/apex/Task2Body.getDomainName';
import { refreshApex } from '@salesforce/apex';

export default class Task2UserComp extends LightningElement {
    @track userObj;
    connectedCallback(){
        userInform()
        .then(result=>{
            this.userObj = result;
        })

        // getDomainName()
        // .then(result=>{
        //     this.domainName = result;
        // })
    }
    @track editStatus = false;
    // @track userRefreshData;
    // @wire(userInform, {}) userData(result){
    //     this.userRefreshData = result;
    // }
    handleEditUser(){
        this.editStatus = true;
    }
    handleCancelUserEdit(){
        this.editStatus = false;
    }
    handleUpdateUser(){
        this.editStatus = false;
        // window.location.reload();
        return refreshApex(this.userObj);
    }
}