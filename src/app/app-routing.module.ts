import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { RequestSuccessComponent } from './pages/request-success/request-success.component';
import { HomeComponent } from './pages/home/home.component';
import { VerifiedComponent } from './pages/verified/verified.component';
import { SigninComponent } from './pages/signin/signin.component';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {authGuard} from "./guards/auth.guard";
import {TaskListComponent} from "./pages/task-list/task-list.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {InboxComponent} from "./pages/inbox/inbox.component";
import {UserHomeComponent} from "./components/user-home/user-home.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";

const routes: Routes = [

  {
    path:"",
    component:HomeComponent
  },

  {
    path:"signup",
    component:SignupComponent,
  },
  {
    path:"verify/:id",
    component:VerifiedComponent,
  },
  {
    path:"thankyou",
    component:RequestSuccessComponent
  },
  {
    path:"signin",
    component:SigninComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[authGuard],
    children: [
      {
        path:"",
        component:UserHomeComponent,
        outlet:"dash"
      },
      {
        path:"tasks",
        component:TaskListComponent,
        outlet:"dash"
      },
      {
        path:"inbox",
        component:InboxComponent,
        outlet:"dash"
      },
      { path: 'profile',
        component: UserProfileComponent,
        outlet:'dash'
      }
    ]

  },

  { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
