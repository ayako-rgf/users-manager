import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatTableModule,
            MatSortModule, MatCardModule, MatTabsModule,
            MatSnackBarModule } from '@angular/material';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { BeersComponent } from './beers/beers.component';
import { AddBeerComponent } from './add-beer/add-beer.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatCardModule,
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
        DashboardComponent,
        BeersComponent,
        BeerDetailComponent,
        AddBeerComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
