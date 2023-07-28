import { LightningElement, track, wire } from 'lwc';

import { subscribe, unsubscribe, MessageContext, publish } from 'lightning/messageService';
import totalDataPublish from '@salesforce/messageChannel/resumeDataChannel__c';
import filterDataPublish from '@salesforce/messageChannel/resumeFilterDataChannel__c';
import { labels } from 'c/labelsUtility';
import { NavigationMixin } from 'lightning/navigation'; 


export default class ResumeFilterComponent extends NavigationMixin(LightningElement) {
    @track myLabels = labels;
    subscription = null;
    @track totalData;
    @track filterData = [];
    @track val=0;
    @track _selectedMulti = [];
    @track selectedpicklist;
    @track sliderValue = 0;
    @track filterStatus = false;
    @track experienceStatus = false;
    @track expertiseStatus = false;
    @track profileStatus = false;
    @track sliderPillShow = false;
    @track pickListPillShow = false;
    @track multiPickListPillShow = false;
    @track value;
    @track valueOfExpertise; 
    @track hamBurgerButtton = true;

    //oprtions for single Picklist (Member's Profile)
    get optionsForProfile() {
        return [
            { label: 'Developer', value: 'Developer' },
            { label: 'Quality Analyst', value: 'Quality Analyst' },
            { label: 'Admin', value: 'Admin' },
        ];
    }

    //communication with the message channels
    @wire(MessageContext) messageContext;
    
    //Retrieve Total Data for filtering using resumeDataChannel
    //Subscribe to resumeDataChannel to receive total data
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                totalDataPublish,
                (message) => this.handleMessage(message),
            );
        }
    }
    //unsubscribe to resumeDataChannel
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    //Handle the message received from resumeDataChannel
    handleMessage(message) {
        this.totalData = message.totalData;
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
        window.addEventListener('resize', this.sidebarDisplayFunction); //To measure the screen size dynamically
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    //Slider for Experience
    handleExperience(){
        this.experienceStatus = !this.experienceStatus;
    }
    //To track the value of slider(Experience)
    handleSliderChange(event){
        this.sliderPillShow = true;
        this.filterStatus = true;
        this.sliderValue = event.target.value;
        this.val = this.sliderValue;
        if(this.sliderValue == 0){
            this.sliderPillShow = false;
            if(this.sliderPillShow == false && this.multiPickListPillShow == false && this.pickListPillShow == false){
                this.filterStatus = false;
                this.modifyOptions();
                this.handleApplyFilters()
            }
        }
        this.getFilterData();
    }
    //To remove the pill od sidebar value
    handleSliderValueRemove() {
        this.sliderPillShow = false;
        this.sliderValue = 0;
        this.val=this.sliderValue;
        if(this.sliderPillShow == false && this.multiPickListPillShow == false && this.pickListPillShow == false){
            this.filterStatus = false;
            this.modifyOptions();
            this.handleApplyFilters();
        }
        this.getFilterData();
    }

    //Combobox for Member's Profile
    handleProfile(){
        this.profileStatus = !this.profileStatus;
    }
    //To track the value of Picklist(Member's Profile)
    handlePicklistSelect(event){
        this.pickListPillShow = true;
        this.filterStatus = true;
        this.selectedpicklist = event.target.value;
        this.value = this.selectedpicklist;
        if(this.selectedpicklist == "" && this.sliderPillShow == false && this.multiPickListPillShow == false){
            this.pickListPillShow = false;
            this.filterStatus = false;
            this.modifyOptions();
            this.handleApplyFilters()
        }
        this.getFilterData();
    }
    //To remove the pill of singlepicklist value
    handleSelectedpicklistRemove(){
        this.pickListPillShow = false;
        this.selectedpicklist = null;
        if(this.sliderPillShow == false && this.multiPickListPillShow == false && this.pickListPillShow == false){
            this.filterStatus = false;
            this.modifyOptions();
            this.handleApplyFilters()
        }
        if(this.selectedpicklist == null){
            this.value = null;
        }
        this.getFilterData();
    }


    //MultiSelect combobox for Expertise
    handleExpertise(){
        this.expertiseStatus = !this.expertiseStatus;
    }
    //Options listed in combobox
    @track optionsForExpertise = [
        { label: 'Salesforce Admin', value: 'Salesforce Admin' },
        { label: 'AURA', value: 'AURA' },
        { label: 'LWC', value: 'LWC' },
        { label: 'Hubspot', value: 'Hubspot' },
        { label: 'Zoho', value: 'Zoho' }
    ]
    //Master options to remove and add the options in combobox
    @track optionMaster = [
        { label: 'Salesforce Admin', value: 'Salesforce Admin' },
        { label: 'AURA', value: 'AURA' },
        { label: 'LWC', value: 'LWC' },
        { label: 'Hubspot', value: 'Hubspot' },
        { label: 'Zoho', value: 'Zoho' }
    ]
    //To track the values of combobox 
    handelMultiSelectValueChange(event){
        this.multiPickListPillShow = true;
        this.filterStatus = true;
        this.valueOfExpertise = event.target.value;
        if(!this._selectedMulti.includes(event.target.value)){
            this._selectedMulti.push(event.target.value);
        }
        if(this.sliderValue == 0 && this._selectedMulti.length == 0 && this.selectedpicklist == null){
            this.filterStatus = false;
            this.modifyOptions();
            this.handleApplyFilters()
            this.multiPickListPillShow = false;
        }
        this.modifyOptions();
    }
    //To remove the pills of selected values
    handle_selectedMultiRemove(event){
        this.valueOfExpertise = '';
        const valueRemoved = event.target.value;
        let index = this._selectedMulti.indexOf(valueRemoved);
        if(index ==0){
            this._selectedMulti.shift();
        }
        else{
            this._selectedMulti.splice(index, 1);
        }
        if(this._selectedMulti.length == 0){
            this.multiPickListPillShow = false;
        }
        if(this.sliderPillShow == false && this.multiPickListPillShow == false && this.pickListPillShow == false){
            this.filterStatus = false;
            this.modifyOptions();
            this.handleApplyFilters()
        }
        this.modifyOptions();
    }
    //To modify the options of combobox whenever an option is selected or pill is removed
    modifyOptions(clear){
        this.optionsForExpertise=this.optionMaster.filter(elem=>{
            if(!this._selectedMulti.includes(elem.value)){
                return elem;
            }
        })
        if(clear){
            this.getFilterData(clear);
        }
        else{
            this.getFilterData();
        }
    }


    //Function for remove complete filtration
    handleClearFilter(){
        this.sliderValue = 0;
        this.val = this.sliderValue;
        this.selectedpicklist = null;
        this.value = null;
        this.valueOfExpertise = '';
        this._selectedMulti.length = 0;
        this.filterStatus = false;
        this.pickListPillShow = false;
        this.sliderPillShow = false;
        this.multiPickListPillShow = false;
        this.modifyOptions('clear');
        if(window.matchMedia('screen and (max-width: 1160px)').matches){
            this.closeNav();
        }
    }
    //Function for applying the selected filters.
    handleApplyFilters(){
        this.publishData();
        if(window.matchMedia('screen and (max-width: 1160px)').matches){
            this.closeNav();
        }
    }


    //Function for filter Data
    getFilterData(clear){
        //for sidebar filter
        if(this.sliderValue != null){
            this.filterData = this.totalData.filter(data => data.Experience__c >= this.sliderValue);
        }
        //for multipicklist filter
        if(this._selectedMulti){
            if(this._selectedMulti.length == 0){
                this.filterData = this.filterData.filter(data => data.Expertise_Key != null);
            }
            else{
                for(var i=0; i<this.filterData.length; i++){
                    if(!this._selectedMulti.every(elem => this.filterData[i].Expertise_Key.includes(elem))){
                        delete this.filterData[i];
                    }
                }
                this.filterData = this.filterData.filter(elemen => {return elemen != null});
            }
        }
        //for single picklist filter
        if(this.selectedpicklist){
            if(this.selectedpicklist == null || this.selectedpicklist == "None" || this.selectedpicklist == ""){
                this.filterData = this.totalData.filter(data => data.Member__r.Profile__c != null);
                this.pickListPillShow = false;
                this.filterStatus = false;
            }
            else{
                this.filterData = this.filterData.filter(data => data.Member__r.Profile__c ==  this.selectedpicklist);
            }
        }
        if(clear){
            this.publishData();
        }
    }

    //Filter Data publish for display component using resumeFilterDataChannel
    publishData(){
        const payload = {filterData : this.filterData};
        publish(this.messageContext, filterDataPublish, payload);
        console.log("🚀  file: resumeFilterComponent.js:177  ResumeFilterComponent  publishData  payload FILTER:", JSON.parse(JSON.stringify(payload)));
    }


    //Open HemBurger
    openNav() {
        if(this.hamBurgerButtton){
            this.template.querySelector('.mySidebar').style.width = "300px";
            this.template.querySelector('.openbtn').style.left = "300px";
            this.hamBurgerButtton = false;   
        }
        else{
            this.closeNav();
        }
     }
     //Close HemBurger
    closeNav() {
         this.template.querySelector('.mySidebar').style.width = 0;
         this.template.querySelector('.openbtn').style.left = 0;
         this.hamBurgerButtton = true;
    }
    //To automatically assign the width of HemBurger according to screen size
 
}