import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurpFormComponent } from './curp-form/curp-form.component';

import { EditUserComponent } from './edit-user/edit-user.component';
import { UserTableComponent } from './user-table/user-table.component';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({

  
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CurpFormComponent,
    EditUserComponent,
    UserTableComponent,
    AddUserComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    AppRoutingModule,
    MatToolbarModule, 
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule, 
    MatExpansionModule,
    MatPaginator,
    MatPaginatorModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
