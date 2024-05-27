import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../alert.service';
import { CommonModule } from '@angular/common';
import { Alert } from '../../../interfaces/alert.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-succss-alert',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './succss-alert.component.html',
  styleUrl: './succss-alert.component.css'
})
export class SuccssAlertComponent implements OnInit {

  public showAlert: boolean = false;
  public alert: Alert = {
    title: '',
    message: '',
    percent: 0,
    img:'',
    time: 0,
    type: '',
    url: '',
  }

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.alertSuccess$.subscribe((res: Alert) => {
      this.showAlert = true;
      this.alert = res;
      setTimeout(() => {
        this.showAlert = false;
      }, res.time)
    })
  }

  closeAlert() {
    this.showAlert = false;
  }
}
