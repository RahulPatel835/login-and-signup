import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendenceListComponent } from './attendence-list/attendence-list.component';
import { AttendenceFromComponent } from './attendence-from/attendence-from.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/attendance-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'attendance-list', component: AttendenceListComponent ,canActivate: [AuthGuard] },
  { path: 'attendance-form', component: AttendenceFromComponent,canActivate: [AuthGuard] },
  { path: 'teacher', component: AttendenceFromComponent,canActivate: [AuthGuard] },
  { path: 'student', component: AttendenceFromComponent,canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
