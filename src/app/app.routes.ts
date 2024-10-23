import { Routes } from '@angular/router';
import { LabsComponent } from './labs/labs.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'labs', component: LabsComponent}
];
