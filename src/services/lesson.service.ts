import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../models/Lesson';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private baseUrl = 'http://localhost:3000/api/courses';

  constructor(
    private http: HttpClient,
    private userService: UsersService
  ) { }

  // getLessonsByCourseId(courseId: number, token: string): Observable<Lesson[]> {

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   // קריאה לנתיב עם Headers
  //   return this.http.get<Lesson[]>(`${this.baseUrl}/${courseId}/lessons`, { headers });
  // }

  // פונקציה ליצירת שיעור חדש (למורים בלבד)
  
  createLesson(courseId: number, lesson: Lesson, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Lesson>(`${this.baseUrl}/${courseId}/lessons`, lesson, { headers });
  }
  
  
  updateLesson(courseId: number, lessonId: number, lesson:any, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Lesson>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`,
       {id:lesson.id,title:lesson.title,content:lesson.content,courseId:courseId}, { headers });
  }
 
  getLessons(courseId: number, token: string): Observable<Lesson[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Lesson[]>(`${this.baseUrl}/${courseId}/lessons`, { headers });
  }

  getLesson(courseId: number, lessonId: number, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Lesson>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  deleteLesson(courseId: number, id: number, token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<string>(`${this.baseUrl}/${courseId}/lessons/${id}`, { headers });
  }
}


