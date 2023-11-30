import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/commonComponents/header/header.component';
import { FooterComponent } from './components/commonComponents/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { FavouriteComponent } from './components/favorites/favourite/favourite.component';
import { SearchComponent } from './components/search/search/search.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { UserdetailComponent } from './components/userDetails/userdetail/userdetail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ForgotPassComponent } from './components/login/forgot-pass/forgot-pass.component';
import { ChangePassComponent } from './components/login/change-pass/change-pass.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecommendComponent } from './components/dashboard/recommend/recommend.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    FavouriteComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    UserdetailComponent,
    ForgotPassComponent,
    ChangePassComponent,
    RecommendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
