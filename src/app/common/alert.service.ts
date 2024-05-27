import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from './interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSuccess = new Subject<any>();
  alertSuccess$ = this.alertSuccess.asObservable();


  constructor() { }


  showAlert (alert: Alert) {
    this.alertSuccess.next( alert );
  }
}
