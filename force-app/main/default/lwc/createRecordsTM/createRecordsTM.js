import { LightningElement, track, wire } from 'lwc';
import FieldsName from '@salesforce/apex/TeamManagementSS.getFields'

export default class CreateRecordsTM extends LightningElement {
    @track fields;
    @track ObjName = 'Contact';
    @track fsetName = 'task3Fieldset';

    handleClick(){
        console.log('data>>>>>>>>>>>>>', this.fields);
        console.log('data>>>>>>>>>>>>>', this.ObjName);
        console.log('data>>>>>>>>>>>>>', this.fsetName);
        FieldsName({objectName: this.ObjName, fieldSetName: this.fsetName})
        .then(result => {
            console.log('11111111111111111111111111');
            this.fields = result;
            console.log(result);
        })
        .catch(error => {
            console.log('222222222222222222222');
            console.log(error);
        })
    }

    
    // @wire(FieldsName,{objectName:'$ObjName', fieldSetName:'$fsetName'})
    // allProjects(data, error){
    //     // console.log('>>>>>>>>>>>>>>>>',this.ObjName);
    //     // console.log('>>>>>>>>>>>>>>>>',this.fsetName);
    //     if(data){
    //         console.log('111111111111111');
    //         console.log('data>>>>>>',data);
    //         this.fields = data;
    //     }
    //     else {
    //         console.log(error);
    //     }
    // }
}