import { LightningElement, api, track } from 'lwc';

const ERROR_MESSAGE_PARAGRAPH_CLASS = 'slds-align_absolute-center errorMessageTextColor';

export default class LocateInMap extends LightningElement {
    @api cmpTitle ='Map';
    @api errorMessage;
    // @api longitude=74;
    // @api latitude=26;
    errorMessageClass = ERROR_MESSAGE_PARAGRAPH_CLASS;
    @track mapMarkers = [];

    @track currentUserCoordinations={};
    
    @api addCoordination(lat,long){
       let marker = {
            location: {
                Latitude: lat,
                Longitude: long
            },
            title: `Location ${this.mapMarkers.length+1} :${lat} ,${long}`,
            description: '',
            icon: 'utility:salesforce1'
            };
         let tempMarker= JSON.parse(JSON.stringify(this.mapMarkers));
         tempMarker.push(marker);   
         this.mapMarkers=tempMarker;   
            
    }

    connectedCallback() {      
        console.log(this.longitude+'::'+this.latitude);
        if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position)=> {
              const lat = position.coords.latitude;
              const long = position.coords.longitude;
              let marker = {
                location: {
                    Latitude: lat,
                    Longitude: long
                },
                title: 'Your Location',
                description: '',
                icon: 'utility:salesforce1',
                value:'hii'
                };
                this.currentUserCoordinations = JSON.parse(JSON.stringify(marker));
                this.mapMarkers.push(this.currentUserCoordinations)
                //this.updateMap(parseFloat(this.longitude),parseFloat(this.latitude));
                // this.mapMarkers=JSON.parse('[{"location":{"Latitude":26.8562056,"Longitude":75.8123639},"title":"Your Location","description":"","icon":"utility:salesforce1","value":"hii"},{"location":{"Latitude":23,"Longitude":67},"title":"Location 2 :23 ,67","description":"","icon":"utility:salesforce1","value":"hii"},{"location":{"Latitude":23,"Longitude":67},"title":"Location 3 :23 ,67","description":"","icon":"utility:salesforce1","value":"hii"}]');
            });
          } else {
            console.log("Geolocation is not supported by this browser.");
          }

        //this.updateMap(77.90, 78.09);
    }

    // updateMap(longitude, latitude) {
    //     console.log('OUTPUT : ',47);
    //     this.mapMarkers=[];
    //     let marker = {
    //         location: {
    //             Latitude: latitude,
    //             Longitude: longitude
    //         },
    //         title: 'map',
    //         description: '',
    //         icon: 'utility:salesforce1',
    //         value:'001'
    //     };
    //     this.mapMarkers.push(this.currentUserCoordinations);
    //     this.mapMarkers.push(marker)
    //     //console.log('OUTPUT : ',this.mapMarkers);
    //     //this.mapMarkers = [{location: { latitude, longitude }}];
    // }

    handleError(error){
        this.mapMarkers = [];
        console.error(error);
    }

    get showMap() {
        return this.mapMarkers.length > 0;
    }
    
    
}