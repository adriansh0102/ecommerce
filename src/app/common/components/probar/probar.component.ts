import { Component } from '@angular/core';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-probar',
  standalone: true,
  imports: [],
  templateUrl: './probar.component.html',
  styleUrl: './probar.component.css'
})
export class ProbarComponent {

  private alert = {
    title: 'New Product',
    message:'Se ha creado un nuevo producto',
    percent: 15,
    img: '../../../../../assets/Screenshot 2024-05-26 111826.png',
    time: 10000,
    type: 'success',
    url: 'alertrojo'
  }


  constructor(
    private alertService: AlertService
  ) { }


  alertProbar() {
    this.alertService.showAlert(this.alert)
  }
}
