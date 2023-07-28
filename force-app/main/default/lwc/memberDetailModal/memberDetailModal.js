/**
 * @description       :
 * @author            : Aditya Kumar Yadav
 * @group             :
 * @last modified on  : 07-25-2023
 * @last modified by  : Aditya Kumar Yadav
**/
import { LightningElement, track, api } from 'lwc';
import fetchMemberDetails from '@salesforce/apex/GetMemberDetailWithProjects.getMemberDetails';// apex class to fetch records of member with there realted projects and total hours
import myResource from '@salesforce/resourceUrl/Member_Icon';// static rescource to get member icon for display card.

export default class MemberDetailModal extends LightningElement {
    memberIcon = myResource; //Static rescource for image.
    memberDetail;
    @api memberId; // getting memberId from parent component in form of list
    connectedCallback() {
        // check if memberId is not empty than only call the apex method
        if (this.memberId && this.memberId.length !== 0) {
            this.fetchData();// function in which we are calling apex method
        }
        else {
            this.memberDetail = ''
        }
    }

    fetchData() {
        fetchMemberDetails({
            memberId: JSON.parse(JSON.stringify(this.memberId))
        }).then(response => {
            this.memberDetail = JSON.parse(response);
        })
    }

    hideModalBox() {
        this.dispatchEvent(new CustomEvent("closemodal"));// fire custom event so that parent component can close the modal.
    }
}