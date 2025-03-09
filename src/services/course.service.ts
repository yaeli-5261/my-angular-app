import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Course } from '../models/Couese';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private baseUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }
  //קבלת הקורסים כולם
  getCourses(token: string): Observable<Course[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Course[]>(this.baseUrl, { headers });
  }
 
  //קבלת קורס עפי הID 
  getCourseById(courseId: number, token: string): Observable<Course> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Course>(`${this.baseUrl}/${courseId}`, { headers });
  }

  // קבלת כל הקורסים של משתמש מסוים
  getCoursesByStudentId(studentId: number, token: string): Observable<Course[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Course[]>(`${this.baseUrl}/student/${studentId}`, { headers });
  }
  // פונקציה לרישום תלמיד לקורס
  enrollStudent(courseId: number, userId: number, token: string): Observable<any> {
    const url = `${this.baseUrl}/${courseId}/enroll`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/${courseId}/enroll`, { userId }, { headers });
  }
  //פונקציה לעזיבת תלמיד מהקורס
  unenrollStudent(courseId: number, userId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/${courseId}/unenroll`, { body: { userId }, headers:headers});
  }





  // קבלת הקורסים של מורה מסוים – נניח שיש לך ב-API נתיב כזה
  getCoursesByTeacherId(teacherId: number, token: string): Observable<Course[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Course[]>(`${this.baseUrl}/teacher/${teacherId}`, { headers });
  }

  // // יצירת קורס חדש – למורים בלבד
  // createCourse(courseData: any, token: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.post<any>(this.baseUrl, courseData, { headers });
  // }

  // // עדכון קורס – למורים בלבד
  // updateCourse(courseId: number, courseData: any, token: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.put<any>(`${this.baseUrl}/${courseId}`, courseData, { headers });
  // }


  // יצירת קורס חדש – למורים בלבד
createCourse(courseData: any, token: string): Observable<any> {
  if (!token) {
    console.error('Error: No token provided.');
    return throwError(() => new Error('No token provided'));
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post<any>(this.baseUrl, courseData, { headers });
}



// עדכון קורס – למורים בלבד
updateCourse(courseId: number, courseData: any, token: string): Observable<any> {
  if (!token) {
    console.error('Error: No token provided.');
    return throwError(() => new Error('No token provided'));
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put<any>(`${this.baseUrl}/${courseId}`, courseData, { headers });
}


  // מחיקת קורס – למורים בלבד
  deleteCourse(courseId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.baseUrl}/${courseId}`, { headers });
  }
 




















































  getCourseLessons(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${courseId}/lessons`);
  }
}





