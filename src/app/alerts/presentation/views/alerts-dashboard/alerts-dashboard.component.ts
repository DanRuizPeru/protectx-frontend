import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertsStore } from '../../../application/alerts-store';
import { Alert } from '../../../domain/model/alert.entity';
import { TranslateModule } from '@ngx-translate/core';
import {AlertFormComponent} from '../alert-form/alert-form.component';

@Component({
  selector: 'app-alerts-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, AlertFormComponent],
  templateUrl: './alerts-dashboard.component.html',
  styleUrls: ['./alerts-dashboard.component.css']
})
export class AlertsDashboardComponent {
  alerts;
  loading;
  error;

  showCreateForm = signal(false);

  constructor(private alertsStore: AlertsStore) {
    this.alerts = this.alertsStore.alerts;
    this.loading = this.alertsStore.loading;
    this.error = this.alertsStore.error;
  }

  openCreateForm() {
    this.showCreateForm.set(true);
  }

  closeCreateForm() {
    this.showCreateForm.set(false);
  }

  saveNewAlert(alertData: Omit<Alert, 'id'>) {
    this.alertsStore.addAlert(alertData);
    this.showCreateForm.set(false);
  }

  getSeverityIcon(alert: Alert): string {
    if (alert.severity >= 5) return '🔴';
    if (alert.severity >= 3) return '🟠';
    return '🟡';
  }

  getSeverityClass(alert: Alert): string {
    if (alert.severity >= 5) return 'severity-critical';
    if (alert.severity >= 3) return 'severity-warning';
    return 'severity-info';
  }

  deleteAlert(id: number): void {
    if (confirm('Are you sure you want to delete this alert?')) {
      this.alertsStore.deleteAlert(id);
    }
  }
}
