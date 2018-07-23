import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { RequestsComponent } from './requests/requests.component';
import { OauthComponent } from './oauth/oauth.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [{
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    }, {
        path: 'oauth',
        component: OauthComponent
    }, {
        path: 'add-user',
        canActivate: [AuthGuard],
        component: AddUserComponent
    }, {
        path: 'requests',
        component: RequestsComponent
    }, {
        path: 'users',
        canActivate: [AuthGuard],
        component: UsersComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
