import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { AuthInterceptorProvider } from './services/auth.interceptor';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import {MatTableModule} from '@angular/material/table';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { QuizzesComponent } from './pages/admin/quizzes/quizzes.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import {MatSelectModule} from '@angular/material/select';
import { DeleteQuizConfirmationComponent } from './pages/admin/quizzes/delete-quiz-confirmation/delete-quiz-confirmation.component';
import { DeleteCategoryConfirmationComponent } from './pages/admin/categories/delete-category-confirmation/delete-category-confirmation.component';
import { QuestionsComponent } from './pages/admin/questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    NavbarComponent,
    FooterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    CategoriesComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    QuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    DeleteQuizConfirmationComponent,
    DeleteCategoryConfirmationComponent,
    QuestionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
