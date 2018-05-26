import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeersComponent } from './beers/beers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { AddBeerComponent } from './add-beer/add-beer.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: BeerDetailComponent },
    { path: 'add-beer', component: AddBeerComponent },
    { path: 'beers', component: BeersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
