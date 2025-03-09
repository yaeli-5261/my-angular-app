import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CoursesService } from '../../services/course.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../models/Couese';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { log } from 'console';
import { MenuComponent } from "../menu/menu.component";


@Component({
    selector: 'app-courses',
    imports: [MatButtonModule, MatCardModule, MatFormFieldModule,
    MatListModule, MatInputModule, MatIconModule, ReactiveFormsModule,
    RouterOutlet],
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class Courses implements OnInit {

    courses: Course[] = [];
    courseForm!: FormGroup;
    token: string = "";

    constructor (private courseService: CoursesService, private fb: FormBuilder,private router: Router) { }

    ngOnInit(): void {
        console.log('ngOnInit');
        
        this.courseForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            instructor: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required]
        });

        this.token=sessionStorage.getItem("userToken") || "";

        this.courseService.getCourses(this.token).subscribe({
            next: (res:any) => {
                console.log(res);
                this.courses = res;
            },
            error: (err:any) => {
                console.error('Failed to load courses', err);
            }
        });
    }
  
    showDetailsCourse(courseId: number){
        console.log('Details')
        this.router.navigate(['menu/showCourse/', courseId]);
    }
}
