import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminLogin } from '../modules/admin-login';
import { catchError, Observable, throwError } from 'rxjs';
import { ProtectedData } from '../modules/protected-data';
import { LoginResponse } from '../modules/login-response';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  // Properties
  url: string = 'https://tois-dt207g-project-webbservice.onrender.com/';

  constructor(private http: HttpClient) { }

  adminLogin(adminLogin: AdminLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + 'login', adminLogin);
  }

  getProtectedData(): Observable<ProtectedData> {
    let token = localStorage.getItem('authtoken');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ProtectedData>(`${this.url}protected`, {headers}).pipe(catchError(error => {
      console.error('Fel vid hämtning av data', error)
      return throwError(() => {
        new Error ('Åtkomst nekad')
      })
    }));
  }
}
