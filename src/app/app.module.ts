import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from './services/authentication/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RequestSuccessComponent } from './pages/request-success/request-success.component';
import { DataService } from './services/data/data.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { VerifiedComponent } from './pages/verified/verified.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NavbarPrivateComponent } from './components/navar-private/navbar-private.component';
import { NavbarPublicComponent } from './components/navbar-public/navbar-public.component';
import {RippleModule} from "primeng/ripple";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {AvatarModule} from "primeng/avatar";
import {SidebarModule} from "primeng/sidebar";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {TaskService} from "./services/task/task.service";
import {TaskListComponent} from "./pages/task-list/task-list.component";
import {TreeTableModule} from "primeng/treetable";
import { InboxComponent } from './pages/inbox/inbox.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import {TreeModule} from "primeng/tree";
import {TabMenuModule} from "primeng/tabmenu";
import {CheckboxModule} from "primeng/checkbox";
import {OverlayPanelModule} from "primeng/overlaypanel";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {UserService} from "./services/user.service";
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    RequestSuccessComponent,
    VerifiedComponent,
    SigninComponent,
    NavbarPrivateComponent,
    NavbarPublicComponent,
    DashboardComponent,
    TaskListComponent,
    PageNotFoundComponent,
    InboxComponent,
    UserHomeComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    MessagesModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    RippleModule,
    AvatarModule,
    SidebarModule,
    TreeTableModule,
    TreeModule,
    TabMenuModule,
    CheckboxModule,
    OverlayPanelModule,
    InputTextareaModule


  ],
  providers: [AuthService,MessageService,DataService,TaskService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
