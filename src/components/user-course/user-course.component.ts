import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Course } from '../../models/Couese';
import { CoursesService } from '../../services/course.service';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from '../../models/Lesson';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-courses',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatIconModule],
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.css']
})
export class UserCourseComponent implements OnInit {

  userId!: number;
  token!: string;
  courses: Course[] = [];
  errorMessage: string = '';

  // משתנים לטיפול בטופס הוספה/עריכה
  courseForm!: FormGroup;
  isEditing: boolean = false;
  editingCourseId!: number;
  showForm: boolean = false;

  lessonForm!: FormGroup;
  lessons: Lesson[] = [];
  selectedCourseId!: number;
  showLessonForm = false; // בקרה על הצגת הטופס


  constructor(
    private coursesService: CoursesService,
    private usersService: UsersService,
    private lessonService: LessonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router

  ) { }


  ngOnInit(): void {
    this.token = this.usersService.getToken() || '';
    this.userId = this.usersService.getUserId() || 0;

    if (!this.token || !this.userId) {
      console.error('User ID or token is missing!');
      this.errorMessage = 'Please log in to view your courses.';
      return;
    }
    if (this.isTeacher()) {
      this.loadTeacherCourses();
      this.initializeForm();
    }

    else
      this.loadUserCourses();

    this.selectedCourseId = Number(this.route.snapshot.paramMap.get('id')); // קבלת ה-ID מה-URL

  // טעינת השעורים עבור הקורס
  this.loadLessonsForCourse();
  }
  loadLessonsForCourse(): void {
    if (this.selectedCourseId) {
      this.lessonService.getLessons(this.selectedCourseId, this.token).subscribe({
        next: (lessons) => {
          this.lessons = lessons;
        },
        error: (error) => {
          console.error('Error fetching lessons:', error);
        }
      });
    }
  }
  initializeForm(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  loadTeacherCourses(): void {
    this.coursesService.getCourses(this.token).subscribe({
      next: (courses) => {
        this.courses = courses.filter(course => course.teacherId === this.userId);
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    })
  }

  loadUserCourses(): void {

    this.coursesService.getCoursesByStudentId(this.userId, this.token).subscribe({
      next: (res) => {
        this.courses = res;
      },
      error: (err) => {
        console.error('Error fetching user courses:', err);
        this.errorMessage = 'Failed to load courses.';
      }
    });
  }

  // פעולת עזיבת קורס (עבור תלמיד)
  unenrollStudent(courseId: number): void {
    this.coursesService.unenrollStudent(courseId, this.userId, this.token).subscribe({
      next: (res) => {
        alert('הוסר בהצלחה !');
        this.loadUserCourses();
      },
      error: (err) => {
        alert('שגיאה בהסרת התלמיד מהקורס .');
      }
    });
  }
  isTeacher() {
    return this.usersService.isTeacher()
  }
  addCourse() {
    this.isEditing = false;
    this.showForm = true;
    this.courseForm.reset();
  }
  deleteCourse(courseId: number) {
    this.coursesService.deleteCourse(courseId, this.token).subscribe({
      next: () => {
        alert('deleted successfully!');
        this.loadTeacherCourses();
      },
      error: (error) => {
        alert("deleted failed")
        console.error('Error deleting course:', error);
      }
    });
  }
  editCourse(courseId: number) {
    this.isEditing = true;
    this.showForm = true;
    this.editingCourseId = courseId;
    // טעינת פרטי הקורס לטופס
    this.coursesService.getCourseById(courseId, this.token).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description
        });
      },
      error: (err) => {
        console.error('Error fetching course details:', err);
      }
    });
  }


  // שליחת הטופס - עבור הוספה או עדכון

  onSubmitCourse(): void {
    if (this.courseForm.invalid) {
      return;
    }

    if (!this.token) {
      console.error('Error: No token provided.');
      alert('Authentication error. Please log in again.');
      return;
    }

    const courseData = this.courseForm.value;

    if (this.isEditing) {
      // עדכון קורס קיים
      const updatedCourseData = { ...courseData, teacherId: this.userId };
      this.coursesService.updateCourse(this.editingCourseId, updatedCourseData, this.token).subscribe({
        next: (res) => {
          alert('Course updated successfully');
          this.showForm = false;
          this.loadTeacherCourses();
        },
        error: (err) => {
          console.error('Error updating course:', err);
        }
      });
    } else {
      // יצירת קורס חדש
      const newCourseData = { ...courseData, teacherId: this.userId };
      this.coursesService.createCourse(newCourseData, this.token).subscribe({
        next: (res) => {
          alert('Course created successfully');
          this.showForm = false;
          this.loadTeacherCourses();
        },
        error: (err) => {
          console.error('Error creating course:', err);
        }
      });
    }
  }

  goLessonForm(id: Number) {
    console.log("in func id", id);

    this.router.navigate([`/menu/lessonCourse/${id}`])
  }

}