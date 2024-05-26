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

  constructor(
    private alertService: AlertService
  ) { }


  alertProbar() {
    this.alertService.showAlert()
  }
}
