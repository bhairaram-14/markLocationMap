import { LightningElement, track } from 'lwc';

export default class DemonstrateLocateInMap extends LightningElement {
    @track coordination = {};
    @track showMap=false;
    
    get isCoordinationValid(){
        let flag1 =!this.coordination ||  this.coordination===undefined || this.coordination.latitude===undefined || this.coordination.longitude === undefined 
        let flag2= !this.coordination || this.coordination.latitude === '' || this.coordination.longitude === ''
        return !flag1 && !flag2
    }
    
    inputCoordination(event){
      if(event.target.value.trim()!=='' ) {
        this.coordination[event.target.name]=parseFloat(event.target.value);
      } 
    else{
        this.coordination[event.target.name]=undefined;
    }
    }

    locateInMap(){
        this.showMap=true;
        this.template.querySelector('c-locate-in-map').addCoordination(this.coordination.latitude,this.coordination.longitude);
        

    }
}