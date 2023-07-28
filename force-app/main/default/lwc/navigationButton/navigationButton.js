import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigationExampleLWC extends NavigationMixin(LightningElement) {
    // handleButtonClick() {
    //     // Generate a URL for the LWC component you want to navigate to
    //     const pageReference = {
    //       type: 'standard__webPage',
    //       attributes: {
    //         //componentName: 'c__teamTask1' // Replace with the name of your target LWC component
    //         url : "www.google.com";
    //       },
    //       state: {}
    //     };
    
    //     // Navigate to the specified LWC component
    //     this[NavigationMixin.Navigate](pageReference);
    //   }


    // navigateToWebPage() {
    //     this[NavigationMixin.Navigate]({
    //         "type": "standard__webPage",
    //         "attributes": {
    //             "url": "https://www.https://cloudanalogy-5e6-dev-ed.develop.lightning.force.com/lightning/n/Create_new?c__object=Account.com/"
    //         }
    //     });
    // }

    navigateToTab() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                //Name of any CustomTab. Visualforce tabs, web tabs, Lightning Pages, and Lightning Component tabs
                apiName: 'Create_new'
            },
        });
    }
}