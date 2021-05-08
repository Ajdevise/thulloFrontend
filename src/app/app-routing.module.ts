import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsComponent } from './components/boards/boards.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './shared/guards/is-not-authenticated.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [IsNotAuthenticatedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [IsNotAuthenticatedGuard] },
  { path: '', component: BoardsComponent, canActivate: [IsAuthenticatedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
