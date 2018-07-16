import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from './requests/requests.component';
import { LoginComponent } from './login/login.component';
import { OauthComponent } from './oauth/oauth.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'oauth', component: OauthComponent },
    { path: 'login', component: LoginComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'requests', component: RequestsComponent },
    { path: 'users', component: UsersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
