import { LightningElement } from 'lwc';

export default class AssignmentJavascriptFirst extends LightningElement {

    day = new Date();
    daynum = day.getDay();
    days = [{
        id:1,
        key:'Monday'
    },
    {
        id:2,
        key:'Tuesday'
    },
    {
        id:3,
        key:'Wednesday'
    },
    {
        id:4,
        key:'Thrusday'
    },
    {
        id:5,
        key:'Friday'
    },
    {
        id:6,
        key:'Saturday'
    },
    {
        id:7,
        key:'Sunday'
    }
];
    getToday = days.key[daynum];
}