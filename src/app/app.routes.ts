import { Routes } from '@angular/router';

// Components
import { RegisterComponent } from './products/register/register.component';
import { ListComponent } from './products/list/list.component';

export const routes: Routes = [
    {path: 'products-register', component: RegisterComponent },
    {path: 'products-list', component: ListComponent },
];
