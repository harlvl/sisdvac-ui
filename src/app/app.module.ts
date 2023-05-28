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
import { AddMemberComponent } from './research/add-member/add-member.component';
import { ResultsComponent } from './results/results.component';
import { EvaluateFormulationComponent } from './components/evaluate-formulation/evaluate-formulation.component';
import { EvaluationResultsComponent } from './components/evaluation-results/evaluation-results.component';
import { ClinicalTrialDesignComponent } from './components/clinical-trial-design/clinical-trial-design.component';
import { ClinicalTrialEvaluationComponent } from './components/clinical-trial-evaluation/clinical-trial-evaluation.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EvaluateStudyComponent } from './components/animal-studies/evaluate-study/evaluate-study.component';

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
    CreateTrialComponent,
    AddMemberComponent,
    ResultsComponent,
    EvaluateFormulationComponent,
    EvaluationResultsComponent,
    ClinicalTrialDesignComponent,
    ClinicalTrialEvaluationComponent,
    EvaluateStudyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    }
  ]
})
export class AppModule { }
