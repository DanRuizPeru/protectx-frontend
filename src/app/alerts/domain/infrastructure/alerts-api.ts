import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from '../model/alert.entity';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertsApi {
  private readonly baseUrl = `${environment.platformProviderApiBaseUrl}/alerts`;

  constructor(private http: HttpClient) {}

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.baseUrl);
  }

  getAlert(id: number): Observable<Alert> {
    return this.http.get<Alert>(`${this.baseUrl}/${id}`);
  }

  createAlert(alert: Omit<Alert, 'id'>): Observable<Alert> {
    return this.http.post<Alert>(this.baseUrl, alert);
  }

  updateAlert(id: number, alert: Omit<Alert, 'id'>): Observable<Alert> {
    return this.http.put<Alert>(`${this.baseUrl}/${id}`, alert);
  }

  deleteAlert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
