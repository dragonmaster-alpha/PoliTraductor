import { Component } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApiService } from './../services/api.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ResultadoPage } from '../resultado/resultado.page';
import { DbService } from './../services/db.service';
import { AdMobPlus, BannerAd } from '@admob-plus/capacitor';
import { Keyboard } from '@capacitor/keyboard';


class Language {
  public id: string;
  public name: string;
}

class Traduccion {
  public src: string;
  public dest: string;
  public text: string;
}


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	
languages: Language[];
origen: Language;
destino: Language;	
texto:string;
traduccion:Traduccion;
textoTraducido:string;
	
  constructor(private api: ApiService, public modalController: ModalController, private db: DbService, public toastController: ToastController) {
	  
	  
	  
	 
	  	Keyboard.setAccessoryBarVisible({isVisible: true})
		
	  
	  	  /*
		  	  "es"=>"Español",
		"en"=>"Inglés",
		"fr"=>"Francés",
		"de"=>"Alemán",
		"it"=>"Italiano",
		"ca"=>"Catalán",
		"pt"=>"Portugués",
		"zh-CN"=>"Chino",
		"ko"=>"Coreano",
		"ar"=>"Árabe",
		"bg"=>"Búlgaro",
		"cs"=>"Checo",
		"tr"=>"Turco",
		"da"=>"Danés",
		"sk"=>"Eslovaco",
		"sl"=>"Esloveno",
		"et"=>"Estonio",
		"fi"=>"Finlandés",
		"el"=>"Griego",
		"he"=>"Hebreo",
		"nl"=>"Holandés",
		"ja"=>"Japonés",
		"lv"=>"Letón",
		"lt"=>"Lituano",
		"pl"=>"Polaco",
		"ro"=>"Rumano",
		"ru"=>"Ruso",
		"sr"=>"Serbio",
		"sv"=>"Sueco"*/
	  
	  this.languages = [
      { id: 'es', name: 'Español' },
      { id: 'en', name: 'Inglés' },
      { id: 'fr', name: 'Francés' },
      { id: 'de', name: 'Alemán' },
      { id: 'it', name: 'Italiano' },
      { id: 'ca', name: 'Catalán' },
      { id: 'pt', name: 'Portugués' },
      { id: 'zh-CN', name: 'Chino' },
      { id: 'ko', name: 'Coreano' },
      { id: 'ar', name: 'Árabe' },
      { id: 'bg', name: 'Búlgaro' },
      { id: 'cs', name: 'Checo' },
      { id: 'tr', name: 'Turco' },
      { id: 'da', name: 'Danés' },
      { id: 'sk', name: 'Eslovaco' },
      { id: 'sl', name: 'Esloveno' },
      { id: 'et', name: 'Estonio' },
      { id: 'el', name: 'Finlandés' },
      { id: 'fr', name: 'Griego' },
      { id: 'he', name: 'Hebreo' },
      { id: 'nl', name: 'Holandés' },
      { id: 'ja', name: 'Japonés' },
      { id: 'lv', name: 'Letón' },
      { id: 'lt', name: 'Lituano' },
      { id: 'pl', name: 'Polaco' },
      { id: 'ro', name: 'Rumano' },
      { id: 'ru', name: 'Ruso' },
      { id: 'sr', name: 'Serbio' },
      { id: 'sv', name: 'Sueco' }
    ];
    
    
    //Origen por defecto
    this.origen = this.languages[1];
    this.destino = this.languages[0];
	  
  }





origenChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('Idioma Origen:', event.value);
  }
  
destinoChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('Idioma Destino:', event.value);
  }
  
  
  changeLanguages(){
	  	
	  var aux:Language;	
	  	aux=this.origen;
	   this.origen = this.destino;
	   this.destino = aux;
	  
  }
  
  
  traducir(){
	  
	  this.traduccion = { src: this.origen.id, dest: this.destino.id, text: this.texto };
      
	  
	  
	  this.api.getTranslation(this.traduccion)
        .subscribe((response) => {
          /*this.zone.run(() => {
            this.userForm.reset();
            this.router.navigate(['/list']);
          })*/
          this.textoTraducido = response.data.traduccion;
          
          if(response.data){
	          this.storeData();
			  this.presentModal();
	          
	          console.log(response);
          }else{
	          //Toast con servicio de traduccion no disponible
	          
	          
          }
          
          
          
        });
	  
	  
	  console.log(this.texto);//this is your textarea value
	  
  }
  
  
  storeData() {
	  this.db.addTraduccion(
	    this.origen.id,
	    this.destino.id,
	    this.texto,
	    this.textoTraducido
	  ).then((res) => {
	    console.log("Traducción almacenada en el histórico");
	  })
	}
  
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No se ha podido realizar la traducción. Prueba en unos segundos.',
      duration: 2000
    });
    toast.present();
  }
  
  
  async presentModal() {
    const modal = await this.modalController.create({
      component: ResultadoPage,
      cssClass: 'my-custom-class',
      componentProps: {
      'src': this.origen,
      'dest': this.destino,
      'traduccion': this.textoTraducido
    }
    });
    return await modal.present();
  }
  
  
  
  


}
