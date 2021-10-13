import { Component } from '@angular/core';
import { DbService } from './../services/db.service';
import { Traduccion } from './../services/traduccion';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

Data: any[] = []

  constructor(private db: DbService) {
	  
	  this.db.getTraducciones();
	  
	  console.log(this.db.traduccionesList);
	  
	  
  }
  
  
  
  
  
  
   ionViewDidEnter(){
	   
	   this.db.dbState().subscribe((res) => {
		    if(res){
		      this.db.fetchSongs().subscribe(item => {
		        this.Data = item
		      })
		    }
		  });
	   
	   
	  console.log("Hemos entrado en la tab, recuperamos las traducciones"); 
	   
    this.db.getTraducciones();
	  
	  console.log(this.db.traduccionesList);
	  
	  console.log("-- FIN recuperación traducciones --");
	  
  }
  

}
