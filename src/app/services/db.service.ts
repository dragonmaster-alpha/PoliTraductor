import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Traduccion } from './traduccion';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {
	
	private storage: SQLiteObject;
  traduccionesList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
	
  constructor(
	  private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) { 
	  
	  
	  this.platform.ready().then(() => {
		      this.sqlite.create({
		        name: 'politraductor_db.db',
		        location: 'default'
		      })
		      .then((db: SQLiteObject) => {
		          this.storage = db;
		          this.startData();
		      });
		    });  
  		}
  
  
   dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchSongs(): Observable<Traduccion[]> {
    return this.traduccionesList.asObservable();
  }
  
  
  getTraducciones(){
    return this.storage.executeSql('SELECT * FROM traducciones', []).then(res => {
      let items: Traduccion[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            src: res.rows.item(i).src,  
            dest: res.rows.item(i).dest,
            texto: res.rows.item(i).texto,
            traduccion: res.rows.item(i).traduccion
           });
        }
      }
      this.traduccionesList.next(items);
      
      console.log("-- Lista Traducciones --");
      console.log(items);
      
    });
  }
  
  
  // Add
  addTraduccion(src, dest, texto, traduccion) {
    let data = [src, dest, texto, traduccion];
    return this.storage.executeSql('INSERT INTO traducciones (src, dest, texto, traduccion) VALUES (?, ?, ?, ?)', data)
    .then(res => {
      this.getTraducciones();
    });
  }
  
  getTraduccion(id): Promise<Traduccion> {
    return this.storage.executeSql('SELECT * FROM traducciones WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        src: res.rows.item(0).src,  
        dest: res.rows.item(0).dest,
        texto: res.rows.item(0).texto,
        traduccion: res.rows.item(0).traduccion
      }
    });
  }
  
  // Delete
  deleteTraduccion(id) {
    return this.storage.executeSql('DELETE FROM traducciones WHERE id = ?', [id])
    .then(_ => {
      this.getTraducciones();
    });
  }
  
  
  
  
  // Crea la BD
    startData() {
      this.httpClient.get(
        'assets/db.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
	          console.log("Creada la BD");
            this.getTraducciones();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  
  
  
}
