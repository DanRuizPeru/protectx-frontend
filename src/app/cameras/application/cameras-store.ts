import { Injectable } from '@angular/core';
import { computed, signal } from '@angular/core';
import { Camera } from '../domain/model/camera.entity';
import { CamerasApi } from '../domain/infrastructure/cameras-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamerasStore {
  private readonly camerasSignal = signal<Camera[]>([]);
  readonly cameras = this.camerasSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly onlineCameras = computed(() =>
    this.cameras().filter(camera => camera.status === 'online')
  );

  readonly recordingCameras = computed(() =>
    this.cameras().filter(camera => camera.status === 'recording')
  );

  constructor(private readonly camerasApi: CamerasApi) {
    this.loadCameras();
  }

  addCamera(camera: Camera): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.camerasApi.createCamera(camera).pipe(retry(2)).subscribe({
      next: createdCamera => {
        this.camerasSignal.update(cameras => [...cameras, createdCamera]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create camera'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateCamera(updatedCamera: Camera): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.camerasApi.updateCamera(updatedCamera).pipe(retry(2)).subscribe({
      next: camera => {
        this.camerasSignal.update(cameras =>
          cameras.map(c => c.id === camera.id ? camera : c)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update camera'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteCamera(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.camerasApi.deleteCamera(id).pipe(retry(2)).subscribe({
      next: () => {
        this.camerasSignal.update(cameras => cameras.filter(c => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete camera'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadCameras(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.camerasApi.getCameras().pipe(takeUntilDestroyed()).subscribe({
      next: cameras => {
        this.camerasSignal.set(cameras);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load cameras'));
        this.loadingSignal.set(false);
      }
    });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }

  // Métodos específicos para cámaras
  toggleCameraStatus(cameraId: number, status: Camera['status']): void {
    const camera = this.cameras().find(c => c.id === cameraId);
    if (camera) {
      const updatedCamera = { ...camera, status };
      this.updateCamera(updatedCamera);
    }
  }

  updateCameraResolution(cameraId: number, resolution: 'high' | 'low'): void {
    const camera = this.cameras().find(c => c.id === cameraId);
    if (camera) {
      const updatedCamera = { ...camera, resolution };
      this.updateCamera(updatedCamera);
    }
  }
}
