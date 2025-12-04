import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertsStore } from '../../../application/alerts-store';
import { Alert } from '../../../domain/model/alert.entity';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-alerts-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, FormsModule],
  templateUrl: './alerts-dashboard.component.html',
  styleUrls: ['./alerts-dashboard.component.css']
})
export class AlertsDashboardComponent {
  alerts;
  loading;
  error;

  // 👇 NEW: control del formulario
  formVisible = signal(false);

  // 👇 NEW: modelo del formulario
  newAlertForm = signal<Omit<Alert, 'id'>>({
    type: '',
    message: '',
    location: '',
    date: '',
    time: '',
    severity: 1
  });

  constructor(private alertsStore: AlertsStore) {
    this.alerts = this.alertsStore.alerts;
    this.loading = this.alertsStore.loading;
    this.error = this.alertsStore.error;
  }

  toggleForm(): void {
    this.formVisible.update(v => !v);
  }

  submitForm(): void {
    const payload = this.newAlertForm();

    // validar algo opcional
    if (!payload.type || !payload.message) {
      alert('Type and message are required');
      return;
    }

    this.alertsStore.addAlert(payload);

    // limpiar formulario
    this.newAlertForm.set({
      type: '',
      message: '',
      location: '',
      date: '',
      time: '',
      severity: 1
    });

    this.formVisible.set(false);
  }

  // existing code
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
