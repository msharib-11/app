import { LightningElement, api, track, wire } from 'lwc';
import getFieldsAndRecords from '@salesforce/apex/ProjectDatatableHelper.getFieldsAndRecords';

export default class ProjectDataTableAyush extends LightningElement {
    
    @api objectApiName; //kind of related list object API Name e.g. 'Case'
    @api fieldSetName; // FieldSet which is defined on that above object e.g. 'CaseRelatedListFS'
    @api criteriaFieldAPIName; // This field will be used in WHERE condition e.g.'AccountId'
    @api firstColumnAsRecordHyperLink; //if the first column can be displayed as hyperlink
    @api criteriaFieldValue; // This field will be used in WHERE condition e.g.'AccountId' equalsto what value.

    @track columns;   //columns for List of fields datatable
    @track initialData;
    @track availableData;   //data for list of fields datatable

    @track sortDirection='asc';
    @track sortBy='';
    // firstFieldAPI
    connectedCallback() {
        //make an implicit call to fetch records from database
        this.fieldsAndRecordsFetcher();
    }

    fieldsAndRecordsFetcher() {
        let firstTimeEntry = false;
        let firstFieldAPI;
        getFieldsAndRecords({
            strObjectApiName: this.objectApiName,
            strfieldSetName: this.fieldSetName,
            criteriaField: this.criteriaFieldAPIName,
            criteriaFieldValue: this.criteriaFieldValue
        })
            .then(data => {
                //get the entire map
                let mapOfFieldAndRecords = JSON.parse(data);

                /* retrieve listOfFields from the map,
                here order is reverse of the way it has been inserted in the map */
                let listOfFields = JSON.parse(Object.values(mapOfFieldAndRecords)[1]);

                console.log('listOfFields ==> ', listOfFields);
                //retrieve listOfRecords from the map
                let listOfRecords = JSON.parse(Object.values(mapOfFieldAndRecords)[0]);

                console.log('listOfRecords ==> ', listOfRecords);
                let items = []; //local array to prepare columns

                /*if user wants to display first column has hyperlink and clicking on the link it will
                naviagte to record detail page. Below code prepare the first column with type = url
                */
                listOfFields.map(element => {
                    //it will enter this if-block just once
                    if (this.firstColumnAsRecordHyperLink != null && this.firstColumnAsRecordHyperLink == 'Yes'
                        && firstTimeEntry == false) {
                        firstFieldAPI = element.fieldPath;
                        console.log('firstFeildApi -- ' , firstFieldAPI);
                        //perpare first column as hyperlink
                        items = [...items,
                        {
                            label: element.label,
                            fieldName: 'URLField',
                            fixedWidth: 300,
                            type: 'url',
                            typeAttributes: {
                                label: {
                                    fieldName: element.fieldPath
                                },
                                target: '_blank'
                            },
                            sortable: true,
                            // initialWidth: '300' 
                        }
                        ];
                        firstTimeEntry = true;
                    } else {
                        items = [...items, {
                            label: element.label,
                            fieldName: element.fieldPath
                        }];
                    }
                });
                //finally assigns item array to columns
                console.log('columns is = ', items);
                this.columns = items;
                this.initialData = listOfRecords;
                this.availableData = listOfRecords;
                this.abc(firstFieldAPI, listOfRecords);
                
                

            })
            .catch(error => {
                console.log('catch called');
                this.error = error;
                console.log('error', error);
                this.initialData = undefined;
            })

    }

    abc(firstFieldAPI,listOfRecords){console.log('abc called');
        if (this.firstColumnAsRecordHyperLink != null && this.firstColumnAsRecordHyperLink == 'Yes') {
            let URLField;
            //retrieve Id, create URL with Id and push it into the array
            this.initialData = listOfRecords.map(item => {
                URLField = '/lightning/r/' + this.objectApiName + '/' + item.Id + '/view';
                return { ...item, URLField };
            });

            //now create final array excluding firstFieldAPI
            this.initialData = this.initialData.filter(item => item.fieldPath != firstFieldAPI);
            console.log('initial data --- ', this.initialData);
            this.paginationHanlder('', this.initialData);
        }
    }



    //-------------------------------------------------------------------------------------------------------------------------
    

    

    @track currentPage =1
    @track totalRecords
    @track recordSize = 10
    @track totalPage = 0

    get disablePrevious(){ 
        return this.currentPage<=1
    }
    get disableNext(){ 
        return this.currentPage>=this.totalPage
    }

    paginationHanlder(event, tempData){ 
        try{
            if(tempData || this.searchKey){
                this.totalRecords = tempData;
            }
            // else if(this.searchKey){
            //     this.totalRecords = this.availableData;
            // }
            else{
                this.totalRecords = this.initialData;
            }
            console.log('tempData -  ' , tempData);
            
            this.totalPage = Math.ceil(this.totalRecords.length/this.recordSize)
            if(event){
                if(event.target.name=='first')
            {
                this.currentPage = 1;
            }
            else if(event.target.name=='previous')
            {
                if(this.currentPage>1){
                    this.currentPage = this.currentPage-1
                }
            }
            else if(event.target.name=='next')
            {
                if(this.currentPage < this.totalPage){
                    this.currentPage = this.currentPage+1
                }
            }
            else if(event.target.name=='last')
            {
                this.currentPage = this.totalPage;
            }
            }
            const start = (this.currentPage-1)*this.recordSize
            const end = this.recordSize*this.currentPage
            this.availableData = this.totalRecords.slice(start, end)
            console.log('page available data --- ' , this.availableData );
            // if(this.searchKey){
            //     this.handleSearch('');
            // }
        }
        
        catch(err) {
            console.log('error is ' , JSON.stringify(err));
        }
    }

    sortHandler(event){
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        console.log('sortBy - ', this.sortBy, '  sortDirection - ', this.sortDirection);
        this.sortData(this.sortBy, this.sortDirection);
    }
    sortData(sortBy, sortDirection){
        let parseData = JSON.parse(JSON.stringify(this.initialData));
        let keyValue = (a) => {
            return a[sortBy];
        };
        let isReverse = sortDirection === 'asc' ? 1: -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.initialData = parseData;
        this.paginationHanlder('', this.initialData);
    }

    get options() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
            { label: '20', value: '20' },
            { label: '25', value: '25' },
            { label: '30', value: '30' },
        ];
    }

    handleChange(event){
        this.recordSize = event.detail.value;
        // this.paginationHanlder('', this.initialData);
        if(this.searchKey){
            this.handleSearch('');
        }
        
    }
    @track searchKey = '';

    handleSearch(event){
        if(event){
            this.searchKey = event.target.value.toLowerCase();
        }
        
        if(this.searchKey){
            if(this.initialData){
                let recs = [];
                for(let rec of this.initialData){
                    // console.log(rec);
                    let valuesArray = Object.values( rec );
                    // console.log( 'valuesArray is ' + JSON.stringify( valuesArray ) );
                    for ( let val of valuesArray ) {
                        let strVal = String( val );  // let strVal = String( rec.Name );
                        if ( strVal ) {
                            if ( strVal.toLowerCase().includes( this.searchKey ) ) { //if ( strVal.toLowerCase().startsWith( this.searchKey ) ) {
                                recs.push( rec );
                                break;
                            }
                        }
                    }
                }
                this.availableData = recs;
                this.paginationHanlder('', this.availableData);
            }
        }
        else{
            this.paginationHanlder('', this.initialData);
        }
    }
}