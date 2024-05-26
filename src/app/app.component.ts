import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuccssAlertComponent } from './common/components/alert/succss-alert/succss-alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , SuccssAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
}
