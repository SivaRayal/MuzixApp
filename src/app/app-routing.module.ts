import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login/login.component';
import { FavouriteComponent } from './components/favorites/favourite/favourite.component';
import { UserdetailComponent } from './components/userDetails/userdetail/userdetail.component';
import { RegisterComponent } from './components/login/register/register.component';
import { SearchComponent } from './components/search/search/search.component';
import { ForgotPassComponent } from './components/login/forgot-pass/forgot-pass.component';
import { ChangePassComponent } from './components/login/change-pass/change-pass.component';
import { GuardGuard } from './guard/guard.guard';
import { RecommendComponent } from './components/dashboard/recommend/recommend.component';

const routes: Routes = [

  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent  },
  { path: 'favourite', component: FavouriteComponent ,canActivate : [GuardGuard] },  
  { path: 'userdetail', component:UserdetailComponent ,canActivate : [GuardGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'forgotPwd', component: ForgotPassComponent },
  { path: 'changePwd', component: ChangePassComponent },
  { path: 'recommend', component: RecommendComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
