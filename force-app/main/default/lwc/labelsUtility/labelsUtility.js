// import { LightningElement } from 'lwc';

// export default class LabelsUtility extends LightningElement {}

import admin from '@salesforce/label/c.Admin';
import appliedFilters from '@salesforce/label/c.AppliedFilters';
import apply from '@salesforce/label/c.Apply';
import aura from '@salesforce/label/c.Aura';
import clear from '@salesforce/label/c.Clear';
import developer from '@salesforce/label/c.Developer';
import exp from '@salesforce/label/c.Exp';
import experience from '@salesforce/label/c.Experience';
import expertise from '@salesforce/label/c.Expertise';
import filters from '@salesforce/label/c.Filters';
import hubspot from '@salesforce/label/c.Hubspot';
import lwc from '@salesforce/label/c.LWC';
import profile from '@salesforce/label/c.Profile';
import qa from '@salesforce/label/c.QA';
import salesforceAdmin from '@salesforce/label/c.SalesforceAdmin';
import zoho from '@salesforce/label/c.Zoho';
import select from '@salesforce/label/c.Select';

import Grid from '@salesforce/label/c.Grid';
import Table from '@salesforce/label/c.Table';
import Resume from '@salesforce/label/c.Resume';
import yr_exp from '@salesforce/label/c.yr_exp';
import Records_per_page from '@salesforce/label/c.Records_per_page';
import No_data_found from '@salesforce/label/c.No_data_found';
import Select_Resume from '@salesforce/label/c.Select_Resume';


const labels = {
    admin,
    appliedFilters,
    apply,
    aura,
    clear,
    developer,
    exp,
    experience,
    expertise,
    filters,
    hubspot,
    lwc,
    profile,
    qa,
    salesforceAdmin,
    zoho,
    select,
    Grid,
    Table,
    Resume,
    yr_exp,
    Records_per_page,
    No_data_found,
    Select_Resume
};

export {labels};