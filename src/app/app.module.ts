import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AppInitService } from './shared/initialization/app-init.service';
import { initializeApp1 } from './shared/initialization/initialize-function';
import { BoardsComponent } from './components/boards/boards.component';
import { AuthInterceptor } from './shared/interceptor/auth-interceptor';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProfilePictureComponent } from './shared/components/profile-picture/profile-picture.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    BoardsComponent,
    LoadingComponent,
    NavbarComponent,
    ProfilePictureComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppInitService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
