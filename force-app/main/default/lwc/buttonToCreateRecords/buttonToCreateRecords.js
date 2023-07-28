/**
 * @description       :
 * @author            : Aditya Kumar Yadav
 * @group             :
 * @last modified on  : 07-17-2023
 * @last modified by  : Aditya Kumar Yadav
**/
import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ButtonToCreateRecords extends NavigationMixin(LightningElement) {
    @api pageApiName='Create_Records__c';
    navigateHome() {
        console.log(this.pageApiName);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.pageApiName
            },
        });
    }
}