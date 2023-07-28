import { LightningElement,track, api } from 'lwc';


export default class FieldDisplayDualCombobox extends LightningElement {

    @api allFields;
    @api defaultFields;
    // @track label=JSON.parse(labels);
    label;
    label2
    // @track label2=JSON.parse(labels2);
    @track isShowModal = false;
    @track requiredOptions=[];
    @track defaultOptions=[];
    @track listOfOptions=[];
    @track currentDefaultOptions=[];
    @track currentSelectedOptions=[];
    connectedCallback()
    {
        this.handleParse()
        let arrOfDefaultValue=[];
        this.label2.forEach((element)=>{
            arrOfDefaultValue.push(element.value);
            if(element.label==="LastName"){
               this.requiredOptions.push(element.label);
           }
        });
        this.defaultOptions=arrOfDefaultValue;
        this.label.forEach((element)=>{
            this.listOfOptions.push({label:element.label,value:element.value});
        });
    }
    handleParse(){
        this.label2=JSON.parse(this.defaultFields)
        this.label=JSON.parse(this.allFields);
    }
    handleChange(event) {
       this.currentDefaultOptions=event.detail.value
       let arrOfLabelVsOption=[];
       let arrOfCurrentValue=event.detail.value;
       for(let j=0; j<arrOfCurrentValue.length;j++)
       {
          for(let i=0; i<this.listOfOptions.length; i++)
          {
                if(arrOfCurrentValue[j]===this.listOfOptions[i].value){
                    arrOfLabelVsOption.push({label:this.listOfOptions[i].label,value:this.listOfOptions[i].value});
              }    
          }
       }  
       this.currentSelectedOptions=arrOfLabelVsOption;
}
    showModalBox() { 
        if(this.isShowModal===true)
        {
            this.isShowModal = false;
        } 
       else if(this.isShowModal===false)
       {
        this.isShowModal = true;
       }
    }
    saveModalBox()
    {
        this.isShowModal = false;
        this.defaultOptions=this.currentDefaultOptions;
        this.dispatchEvent(new CustomEvent('fieldselected', {
            detail: {
                selectedField: this.currentSelectedOptions,
            }
        }));
    }
    errorCallback(error, stack) {
        console.log('Error : ',error);
    }
}