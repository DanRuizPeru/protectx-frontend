import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../model/camera.entity';

@Injectable({
  providedIn: 'root'
})
export class CamerasApi {
  private readonly baseUrl = 'http://localhost:3000/cameras';

  constructor(private http: HttpClient) {}

  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.baseUrl);
  }

  getCamera(id: number): Observable<Camera> {
    return this.http.get<Camera>(`${this.baseUrl}/${id}`);
  }

  createCamera(camera: Camera): Observable<Camera> {
    return this.http.post<Camera>(this.baseUrl, camera);
  }

  updateCamera(camera: Camera): Observable<Camera> {
    return this.http.put<Camera>(`${this.baseUrl}/${camera.id}`, camera);
  }

  deleteCamera(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
