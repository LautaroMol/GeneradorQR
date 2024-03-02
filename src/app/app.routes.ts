import { Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
    {
        path:'form',
        component: FormComponent
    },
    {
        path: 'codes',
        component: ListComponent
    },
];
