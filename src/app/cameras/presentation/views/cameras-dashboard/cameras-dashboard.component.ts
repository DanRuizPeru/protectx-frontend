import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CamerasStore } from '../../../application/cameras-store';
import { Camera } from '../../../domain/model/camera.entity';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cameras-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './cameras-dashboard.component.html',
  styleUrls: ['./cameras-dashboard.component.css']
})
export class CamerasDashboardComponent {
  cameras;
  loading;

  constructor(private camerasStore: CamerasStore) {
    // ✅ CORRECTO: Inicializar después del constructor
    this.cameras = this.camerasStore.cameras;
    this.loading = this.camerasStore.loading;
  }

  getStatusIcon(camera: Camera): string {
    switch (camera.status) {
      case 'online': return '🟢';
      case 'recording': return '🔴';
      case 'offline': return '⚫';
      default: return '⚫';
    }
  }
}
