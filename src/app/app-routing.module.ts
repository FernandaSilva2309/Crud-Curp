import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CurpFormComponent } from './curp-form/curp-form.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserTableComponent } from './user-table/user-table.component';
import { AddUserComponent } from './add-user/add-user.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'curp-form', component: CurpFormComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'user-table', component: UserTableComponent }, 
  { path: 'add-user', component: AddUserComponent },
  // Añade otras rutas aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
