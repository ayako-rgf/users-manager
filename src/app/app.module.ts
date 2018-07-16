import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatTableModule,
         MatSortModule, MatTabsModule, MatCheckboxModule,
         MatSnackBarModule } from '@angular/material';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RequestsComponent } from './requests/requests.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatSortModule,
        MatTabsModule,
        MatSnackBarModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
        )
    ],
    declarations: [
        AppComponent,
        RequestsComponent,
        UsersComponent,
        AddUserComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
