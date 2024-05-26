import { Routes } from '@angular/router';
import { SuccssAlertComponent } from './common/components/alert/succss-alert/succss-alert.component';
import { ProbarComponent } from './common/components/probar/probar.component';

export const routes: Routes = [
  {
    path: 'alert',
    component: SuccssAlertComponent,
  },
  {
    path: 'probar',
    component: ProbarComponent
  },
  {
    path:'**',
    redirectTo:'alert'
  }
];
