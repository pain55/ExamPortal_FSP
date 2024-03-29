import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { QuizzesComponent } from './pages/admin/quizzes/quizzes.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { QuestionsComponent } from './pages/admin/questions/questions.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent,
    pathMatch: 'full'

  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: "full"
  },
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],

    children: [
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path:"categories",
        component: CategoriesComponent,
      },
      {
        path:"add-category",
        component: AddCategoryComponent
      },
      {
        path:"quizzes",
        component: QuizzesComponent
      },
      {
        path:"questions/:quizId/:quizTitle",
        component:QuestionsComponent,
      }

    ]
  },
  {
    path:"user-dashboard",
    component: UserDashboardComponent,
    pathMatch: "full",
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
