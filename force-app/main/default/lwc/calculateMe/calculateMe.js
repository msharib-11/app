import { LightningElement, track } from 'lwc';

export default class CalculateMe extends LightningElement {
    @track num1;
    @track num2;
    res;
    handleNum1Change(event){
        this.num1 = parseInt(event.target.value);
    }
    handleNum2Change(event){
        this.num2 = parseInt(event.target.value);
    }
    addition = ()=>{
        this.res = (this.num1) + (this.num2);
    }
    subtraction = ()=>{
        this.res = (this.num1) - (this.num2);
    }
    multiplication = ()=>{
        this.res = (this.num1) * (this.num2);
    }
    division = ()=>{
        this.res = (this.num1) / (this.num2);
    }
}