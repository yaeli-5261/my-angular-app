
// import { Routes } from '@angular/router';

import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import { MenuComponent } from "../components/menu/menu.component";
import { LessonsComponent } from "../components/lessons-course/lessons-course.component";
import { ShowCourseComponent } from "../components/show-course/show-course.component";
import { Courses } from "../components/courses/courses.component";
import { UserCourseComponent } from "../components/user-course/user-course.component";


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }, // שונה למעבר לעמוד חדש
  {
    path: 'menu', component: MenuComponent,
    children: [
      { path: 'lessonCourse/:id', component: LessonsComponent },
      { path: 'courses', component: Courses },
      { path: 'showCourse/:id', component: ShowCourseComponent },
      {
        path: 'myCourses', component: UserCourseComponent,
      }
    ]
  }
];
