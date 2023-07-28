import { LightningElement, api} from 'lwc';

export default class ChildComp extends LightningElement {
    @api
    message = "Hello";
    name = "Mohd Sharib"
}