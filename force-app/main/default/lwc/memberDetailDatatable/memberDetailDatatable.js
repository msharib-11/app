import { LightningElement } from 'lwc';
const columnsForMember = [
    { label: 'Member Name', fieldName: 'Member__c' },
    { label: 'Billing Hours', fieldName: 'Billing_Hours__c'},
    { label: 'Real Used Hours', fieldName: 'Real_used_hours__c'},
    { label: 'Time Sheet', fieldName: '	Time_sheet_Link__c', type: 'url'}
];
export default class MemberDetailDatatable extends LightningElement {
    columnsForMember = columnsForMember;
}