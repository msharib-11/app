import { LightningElement, wire, track } from 'lwc';
import getCon from '@salesforce/apex/JsApexClass.getContacts';

export default class Js_search_sort extends LightningElement {

    @track actions = [
        { label: 'View', name: 'view'}, 
        { label: 'Edit', name: 'edit'}, 
        { label: 'Delete', name: 'delete'}
    ];

    @track getallContact = [
        {label: 'LastName',fieldName: 'LastName', sortable: "true"},
        {label: 'Phone',fieldName: 'Phone', sortable: "true"},
        {label: 'Email',fieldName: 'Email', sortable: "true"},
        {label: 'Status', fieldName: 'ActiveCon__c', sortable: "true"},
        {
            type: 'action',
            typeAttributes: {
                rowActions: this.actions,
                menuAlignment: 'right',
            }
        }
    ];
    @track records;

    @wire(getCon) 
    allContacts({data, error}) {
        if(data){
            this.availableAccounts = data;
            this.initialRecords = data;
            console.log(this.recordsToDisplay);
        }
        else if(error){
            console.log(error);
        }
    }

    @track availableAccounts;
    @track searchString;
    @track initialRecords;


    handleSearch( event ) {
        const searchKey = event.target.value.toLowerCase();
        console.log( 'Search String is ' + searchKey );

        if ( searchKey ) {

            this.availableAccounts = this.initialRecords;
            console.log( 'Account Records are ' + JSON.stringify( this.availableAccounts ) );
            
            if ( this.availableAccounts ) {

                let recs = [];
                
                for ( let rec of this.availableAccounts ) {

                    console.log( 'Rec is ' + JSON.stringify( rec ) );
                    let valuesArray = Object.values( rec );
                    console.log( 'valuesArray is ' + JSON.stringify( valuesArray ) );
 
                    for ( let val of valuesArray ) {

                        console.log( 'val is ' + val );
                        let strVal = String( val );
                        
                        if ( strVal ) {

                            if ( strVal.toLowerCase().includes( searchKey ) ) {

                                recs.push( rec );
                                break;
                        
                            }

                        }

                    }
                    
                }

                console.log( 'Matched Accounts are ' + JSON.stringify( recs ) );
                this.data = recs;

            }
 
        }  else {

            this.data = this.records;

        }        
    }

}