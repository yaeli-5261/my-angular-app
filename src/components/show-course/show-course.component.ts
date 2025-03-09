import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/Lesson';
import { CoursesService } from '../../services/course.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import { Course } from '../../models/Couese';
import { UppercasePipe } from "../../pipe/uppercase.pipe";
import { ColorCourseDirective } from '../../Directive/button-hover.directive';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-show-course',
  standalone: true,
  imports: [UppercasePipe,MatButtonModule,ColorCourseDirective],
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {

  token!: string;
  course!: Course;
  userId: number = 0;
 
  courseId: number = 0;
  lessons: Lesson[] = [];
  user!: User;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private courseService: CoursesService,
    private userService: UsersService,
  )
  { 
    
  }

  ngOnInit(): void {
    this.token = this.userService.getToken() || "";
    this.userId = this.userService.getUserId() || 0;
    if (!this.token) {
      console.error('No authentication token found!');
      return;
    }
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
    });
    this.userId = this.userService.getUserId();
    this.loadCourseDetails();
    this.loadLessons();
  }

  // טעינת נתוני המשתמש
  loadUserDetails(): void {
    this.userService.getUserById(this.course.teacherId, this.token).subscribe({
      next: (user: User) => {
        this.user = user;
        console.log("User loaded:", this.user);

      },
      error: (err: any) => {
        console.error('Error loading user details', err);
      }
    });
  }
  loadLessons() {
    return this.lessonService.getLessons(this.courseId, this.token).subscribe({
      next: (lessons: Lesson[]) => {
        this.lessons = lessons;
      },
      error: (err) => {
        console.error('Error loading lessons list', err);
      }
    })
  }
  // טעינת נתוני הקורס
  loadCourseDetails(): void {

    this.courseService.getCourseById(this.courseId, this.token).subscribe({
      next: (course: Course) => {
        this.course = course;
        this.loadUserDetails();
      },
      error: (err) => {
        console.error('Error loading course details', err);
      }
    });

  }

  // פונקציה לרישום תלמיד לקורס
  enrollInCourse(): void {
    if (this.userId == 0) {
      console.error('User ID is missing!');
      return;
    }

    this.courseService.enrollStudent(this.courseId, this.userId, this.token).subscribe({
      next: (response) => {
        this.message = response.message || "";
        console.log('Enrollment successful:', response.message);
      },
      error: (err) => {
        console.error('Error enrolling in course:', err);
        this.message = 'Error enrolling in course';
      }
    });
  }
  isTeacher() {
    return this.userService.isTeacher()
  }
  
}
