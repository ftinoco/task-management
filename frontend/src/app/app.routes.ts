import { Routes } from '@angular/router';
import { ListComponent } from './task/list/list.component';
import { CreateComponent } from './task/create/create.component';

export const routes: Routes = [
    { path: 'task', redirectTo: 'task/list', pathMatch:"full"},
    { path: 'task/list', component: ListComponent},
    { path: 'task/create', component: CreateComponent}
];
