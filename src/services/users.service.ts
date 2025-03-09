import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/api/auth';  // כתובת ה-API להתחברות
  private UesrApiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: string, userId: number }> {
    const body = { email, password };
    return this.http.post<{ token: string, userId: number }>(`${this.apiUrl}/login`, body);
}

  register(name: string, email: string, password: string, role: string): Observable<any> {

    const body = { name, email, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, body);

  }
  // פונקציה לבדיקת אם המשתמש מחובר
  isLoggedIn(): boolean {

    const token = sessionStorage.getItem('userToken');
    return token ? true : false;  // אם יש טוקן ב-sessionStorage אז המשתמש מחובר

  }

  // פונקציה לשמירת טוקן לאחר התחברות
  setToken(token: string): void {
   
    sessionStorage.setItem('userToken', token)
  }
  
  setUserId(userId: number): void {
    const userID = sessionStorage.getItem('userId');
    console.log('User ID:', userID); // בדיקה אם ה-ID נכון
    

    console.log('Saving user ID to session:', userId);
    sessionStorage.setItem('userId', userId.toString());
  }

  getToken(): string | null {

    return sessionStorage.getItem('userToken')

  }
  getUserId(): number {
    return Number(sessionStorage.getItem('userId')) || 0; // החזרת ID מה-LS
  }
 
  clearToken(): void {

    sessionStorage.removeItem('userToken')
    sessionStorage.removeItem('userId')
  }

  isAuthenticated(): boolean {

    return this.getToken() !== null;
  }
  getUserById(userId: number, token: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.UesrApiUrl}/${userId}`, { headers });
  }
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // פענוח הטוקן
      return payload.role || null;
    } catch (e) {
      console.error('שגיאה בפענוח הטוקן', e);
      return null;
    }
  }

  isTeacher(): boolean {
    return this.getUserRole() === 'teacher';
  }

}














