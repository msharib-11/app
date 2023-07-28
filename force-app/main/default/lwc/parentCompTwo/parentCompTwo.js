import { LightningElement, track } from 'lwc';

export default class ParentCompTwo extends LightningElement {
    @track searchValue;
    handleSearchValue(event){
        this.searchValue = event.detail;
    }
}