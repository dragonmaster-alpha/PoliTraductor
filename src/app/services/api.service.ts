import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


export class Traduccion {
  src: string;
  dest: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	
	endpoint = 'https://api.politraductor.com/getTranslation.php';
	//endpoint = 'http://localhost/politraductorapi/public/getTranslation.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
	
	
  constructor(private httpClient: HttpClient, public toastController: ToastController) { }
  
  
    async presentToast() {
    const toast = await this.toastController.create({
      message: 'No se ha podido realizar la traducción. Prueba en unos segundos.',
      duration: 2000
    });
    toast.present();
  }
  
  
  getTranslation(traduccion: Traduccion): Observable<any> {
    return this.httpClient.post<Traduccion>(this.endpoint, JSON.stringify(traduccion), this.httpOptions)
      .pipe(
        catchError(this.handleError<Traduccion>('Error occured'))
      );
  }
  
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      
      this.presentToast();
      
      return of(result as T);
    };
  }  
  
  
}
