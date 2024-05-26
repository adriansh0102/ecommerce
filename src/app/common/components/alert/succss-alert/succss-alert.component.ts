import { Component } from '@angular/core';
import { AlertService } from '../../../alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-succss-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './succss-alert.component.html',
  styleUrl: './succss-alert.component.css'
})
export class SuccssAlertComponent {

  message:any
  public showAlert:boolean = false;

  constructor( private alertService: AlertService) { }

  ngOnInit(){
    this.alertService.alertSuccess$.subscribe((res:any) => {
      this.showAlert = true;
      this.message = res;

      setTimeout(() => {
        this.showAlert = false;

      }, res.time)





      console.log(this.message);
    })
  }

  pepe(){
    console.log('pepe');

  }
}
