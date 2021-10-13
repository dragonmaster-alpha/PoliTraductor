import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
	
	public traduccion;

  constructor(navParams: NavParams, public modalController: ModalController) {
	  
	  console.log(navParams.get('src'));
    console.log(navParams.get('dest'));
    console.log(navParams.get('traduccion'));
	  
	   }

  ngOnInit(){}
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  

}
