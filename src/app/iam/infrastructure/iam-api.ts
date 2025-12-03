import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../domain/model/user.entity';

@Injectable({
  providedIn: 'root'
})
export class IamApi {
  // Construye la URL base: .../api/v1/users
  private baseUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderUsersEndpointPath}`;

  constructor(private http: HttpClient) {}

  // REGISTRO: POST .../api/v1/users/sign-up
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/sign-up`, user);
  }

  // LOGIN: POST .../api/v1/users/sign-in
  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sign-in`, credentials);
  }
}
