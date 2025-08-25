import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminInlogComponent } from './pages/admin-inlog/admin-inlog.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { EditReservationComponent } from './pages/edit-reservation/edit-reservation.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'menu', component: MenuComponent},
    {path: 'reservation', component: ReservationComponent},
    {path: 'about', component: AboutComponent},
    {path: 'admin-inlog', component: AdminInlogComponent},
    {path: 'administration', component: AdministrationComponent},
    {path: 'edit-reservation/:id', component: EditReservationComponent}
];
