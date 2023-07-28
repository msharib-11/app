import { LightningElement, api, track } from 'lwc';
import ImageForMember from '@salesforce/resourceUrl/ImageForMember';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RecViewFormForMemberDetail extends LightningElement {
    data = [];
    @api recordId;
    @api objectApiName;
    @api listOfFieldsFromFieldset = [];
    @api recordViewFormModalHeader;
    @api memberDetailList;
    @api projectDetailList;
    memberId;
    countRealHours = 0;
    countBillHours = 0;
    arrOfMemberDet;
    lstOfProjects;
    arrOfProjectIds = [];
    arrOfProj = [];
    ImageForMem = ImageForMember;
    memberName = '';
    showMembrProjDataTbl = false;
    @api yearsFromParent;
    @track selectedYear = 'None';
    columns = [
        { label: 'Project Name', fieldName: 'Name' },
        { label: 'Month', fieldName: 'Month' },
        { label: 'Billed Hours', fieldName: 'BillingHr', type: 'integer' },
        { label: 'Real Used Hours', fieldName: 'UsedHr', type: 'integer' },
    ];
    get optionsForYear() {
        return this.yearsFromParent;
    }
    handleChangeForYear(event) {
        this.selectedYear = event.detail.value;
        this.arrOfProj = [];
        this.showMembrProjDataTbl = false;
        this.prepareProjectDataForMember();
    }

    connectedCallback() {
        this.lstOfProjects = JSON.parse(JSON.stringify(this.projectDetailList))
        this.arrOfMemberDet = JSON.parse(JSON.stringify(this.memberDetailList))
        this.calcTotalHrs();
        this.prepareProjectDataForMember();
    }

    handleClose() {
        const selectEvent = new CustomEvent('closemodalforview');
        this.dispatchEvent(selectEvent);
    }

    calcTotalHrs() {
        for (let i = 0; i < this.arrOfMemberDet.length; i++) {
            if (this.arrOfMemberDet[i].Id === this.recordId) {
                this.memberId = this.arrOfMemberDet[i].Member__c;
                this.memberName = this.arrOfMemberDet[i].Member_Name;
            }
        }
        for (let i = 0; i < this.arrOfMemberDet.length; i++) {
            if (this.arrOfMemberDet[i].Member__c === this.memberId) {
                this.countRealHours += this.arrOfMemberDet[i].Real_used_hours__c;
                this.countBillHours += this.arrOfMemberDet[i].Billing_Hours__c;
                this.arrOfProjectIds.push(this.arrOfMemberDet[i].Project__c);
            }
        }
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    prepareProjectDataForMember(){
        // let proj = {id:this.memberDetailList[0].Id, Name:this.memberDetailList[0].Project__r.Name, BillingHr:this.memberDetailList[0].Billing_Hours__c, UsedHr:this.memberDetailList[0].Real_used_hours__c};
        for (let i = 0; i < this.memberDetailList.length; i++) {
            // let proj = {id:this.memberDetailList[i].Project__c, Name:this.memberDetailList[i].Project__r.Name, BillingHr:this.memberDetailList[i].Billing_Hours__c, UsedHr:this.memberDetailList[i].Real_used_hours__c};
            // for(let j = 0; j<this.arr.length; j++){
            //     if(this.memberDetailList[i].Project__c === this.arr[j].id){
            //         this.arr[j].BillingHr += this.memberDetailList[i].Billing_Hours__c;
            //         this.arr[j].UsedHr += this.memberDetailList[i].Real_used_hours__c;
            //     }
            //     else{
            //         this.arr = [...this.arr, proj];
            //     }
            // }
            if (this.memberId === this.memberDetailList[i].Member__c) {
                if (this.selectedYear === this.memberDetailList[i].Year__c) {
                    let billHrs = this.memberDetailList[i].Billing_Hours__c;
                    let usedHrs = this.memberDetailList[i].Real_used_hours__c;
                    let proj = { Name: this.memberDetailList[i].Project__r.Name, Month: this.memberDetailList[i].Month__c, BillingHr: billHrs, UsedHr: usedHrs };
                    this.arrOfProj.push(proj);
                }
                else if (this.selectedYear === 'None'){
                    let billHrs = this.memberDetailList[i].Billing_Hours__c;
                    let usedHrs = this.memberDetailList[i].Real_used_hours__c;
                    let proj = { Name: this.memberDetailList[i].Project__r.Name, Month: this.memberDetailList[i].Month__c, BillingHr: billHrs, UsedHr: usedHrs };
                    this.arrOfProj.push(proj);
                }
                // if (this.selectedYear == undefined){
                //     let billHrs = this.memberDetailList[i].Billing_Hours__c;
                //     let usedHrs = this.memberDetailList[i].Real_used_hours__c;
                //     let proj = { Name: this.memberDetailList[i].Project__r.Name, Month: this.memberDetailList[i].Month__c, BillingHr: billHrs, UsedHr: usedHrs };
                //     this.arrOfProj.push(proj);
                // }
            }
        }
        this.data = JSON.parse(JSON.stringify(this.arrOfProj));
        if(this.data.length != 0){
            this.showMembrProjDataTbl = true;
        }
        else{
            this.showToast('OOPS','No record found','Error')
        }
    }
}