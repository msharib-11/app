/**
 * @description       :
 * @author            : Aditya Kumar Yadav
 * @group             :
 * @last modified on  : 07-21-2023
 * @last modified by  : Aditya Kumar Yadav
**/
import { LightningElement, api } from 'lwc';
import componentHeading from '@salesforce/label/c.Heading_label_for_CreateRecordDynamicallyTM';
import componentFooter from '@salesforce/label/c.Footer_for_CreateRecordDynamicallyTM';
import myImages from '@salesforce/resourceUrl/ImageForTMComponent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import componentBody from '@salesforce/label/c.Body_For_CreateRecordDynamicallyTMreateRecordDynamicallyTM';
import FORM_FACTOR from "@salesforce/client/formFactor";
export default class CreateRecordDynamicallyTM extends LightningElement {
    bodyText = componentBody;
    footerLabel = componentFooter;
    showCreateForm = false;
    showCreateButton = true;
    divClass = 'slds-var-m-around_xx-large'
    heading = componentHeading
    objectApiName;
    @api objectDescription
    objectDescriptions;
    fieldSetName;
    objectLabel;
    gridSize = 2
    @api objectOptions
    objects;
    @api getFieldSetName;
    fieldSetOptions
    objectOption = [];
    multipleRow = false;
    connectedCallback() {
        try {
            this.parseHandler()
            this.handleFormFactor();
        }
        catch (exp) {
            console.log(JSON.stringify(exp));
        }
    }
    parseHandler() {
        this.fieldSetOptions = JSON.parse(this.getFieldSetName)
        this.objectDescriptions = JSON.parse(this.objectDescription);
        this.objects = JSON.parse(this.objectOptions);
        this.parseOptions();
    }
    handleFormFactor() {
        if (FORM_FACTOR === "Small") {
            this.gridSize = 10
            this.multipleRow = true
            this.divClass = 'slds-var-m-around_medium'
        }
        else if (FORM_FACTOR === "Medium") {
            this.gridSize = 4
            this.multipleRow = true
        }
    }

    parseOptions() {
        try {
            for (var key in this.objects) {
                let repeatValue = { label: key, value: this.objects[key], imageLink: myImages + `/imagesForTMComponent/${this.objects[key]}.jpg`, description: this.objectDescriptions[key] ? this.objectDescriptions[key] : 'Click to create record' };
                this.objectOption = [...this.objectOption, repeatValue]
            }
        }
        catch (exp) {
            console.log(exp);
        }
    }

    handleOptionSelection(event) {
        try {
            let fieldSetFound = false;
            this.showCreateButton = false;
            this.objectApiName = event.currentTarget.dataset.id;
            this.objectLabel = event.currentTarget.dataset.name;
            for (var key in this.fieldSetOptions) {
                if (key === this.objectApiName) {
                    fieldSetFound = true;
                    this.fieldSetName = this.fieldSetOptions[this.objectApiName];
                    break;
                }
            }
            if (fieldSetFound) {
                this.showCreateForm = true
            }
            else {
                showToast('ERROR', 'FieldSet missing contact developer', 'destructive')
            }

        } catch (exp) {
            console.log(JSON.stringify(exp));
        }
    }

    handleClose() {
        this.showCreateForm = false;
    }

    handlRecordSave() {
        this.showCreateForm = false;
        this.showToast('Success', 'Record Created Succesfully', 'Success');
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}