import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSuccess = new Subject<any>();
  alertSuccess$ = this.alertSuccess.asObservable();

  private alert = {
    message:'Mensaje de prueba',
    time: 5000,
    type: 'success'
  }

  constructor() { }


  showAlert () {
    this.alertSuccess.next( this.alert );
  }
}
