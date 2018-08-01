import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatTableModule,
         MatSortModule, MatTabsModule, MatCheckboxModule,
         MatSnackBarModule, MatPaginatorModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RequestsComponent } from './requests/requests.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { OauthComponent } from './oauth/oauth.component';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatSortModule,
        MatTabsModule,
        MatSnackBarModule,
        MatPaginatorModule,
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
        OauthComponent,
        DatatableComponent
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 4000
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
