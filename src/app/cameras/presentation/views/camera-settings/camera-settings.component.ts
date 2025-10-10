import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CamerasStore } from '../../../application/cameras-store';
import { Camera } from '../../../domain/model/camera.entity';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-camera-settings',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslateModule],
  templateUrl: './camera-settings.component.html',
  styleUrls: ['./camera-settings.component.css']
})
export class CameraSettingsComponent {
  camera: Camera | undefined;
  cameraId: number;

  constructor(
    private camerasStore: CamerasStore,
    private route: ActivatedRoute
  ) {
    this.cameraId = Number(this.route.snapshot.paramMap.get('id'));
    this.camera = this.camerasStore.cameras().find(cam => cam.id === this.cameraId);
  }

  updateResolution(resolution: 'high' | 'low'): void {
    if (this.camera) {
      this.camerasStore.updateCameraResolution(this.camera.id, resolution);
    }
  }

  toggleNightVision(): void {
    if (this.camera) {
      const updatedCamera = {
        ...this.camera,
        nightVision: !this.camera.nightVision
      };
      this.camerasStore.updateCamera(updatedCamera);
    }
  }

  toggleMotionDetection(): void {
    if (this.camera) {
      const updatedCamera = {
        ...this.camera,
        motionDetection: !this.camera.motionDetection
      };
      this.camerasStore.updateCamera(updatedCamera);
    }
  }
}
