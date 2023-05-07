import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import {NgOptimizedImage} from "@angular/common";
import { ResearchComponent } from './research/research.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import { CreateTrialComponent } from './research/create-trial/create-trial.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    MainComponent,
    ResearchComponent,
    LoginComponent,
    CreateTrialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    }
  ]
})
export class AppModule { }
