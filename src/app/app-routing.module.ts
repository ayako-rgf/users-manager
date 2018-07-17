import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { RequestsComponent } from './requests/requests.component';
import { LoginComponent } from './login/login.component';
import { OauthComponent } from './oauth/oauth.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [{
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }, {
        path: 'oauth',
        canActivate: [AuthGuard],
        component: OauthComponent
    }, {
        path: 'login',
        canActivate: [AuthGuard],
        component: LoginComponent
    }, {
        path: 'add-user',
        canActivate: [AuthGuard],
        component: AddUserComponent
    }, {
        path: 'requests',
        canActivate: [AuthGuard],
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
