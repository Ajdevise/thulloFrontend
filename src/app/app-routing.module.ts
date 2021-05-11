import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppWrapperComponent } from './components/app-wrapper/app-wrapper.component';
import { BoardsComponent } from './components/boards/boards.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './shared/guards/is-not-authenticated.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [IsNotAuthenticatedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [IsNotAuthenticatedGuard] },
  { path: '', component: AppWrapperComponent, canActivate: [IsAuthenticatedGuard], children: [
    { path: '', component: BoardsComponent },
    { path: 'users/:id', component: ProfileComponent },
    { path: 'users/:id/edit', component: LoadingComponent},
    { path: 'board/:id', component: LoadingComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
