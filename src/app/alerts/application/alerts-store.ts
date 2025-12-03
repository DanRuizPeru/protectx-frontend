import { Injectable } from '@angular/core';
import { computed, signal } from '@angular/core';
import { Alert } from '../domain/model/alert.entity';
import { AlertsApi } from '../domain/infrastructure/alerts-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsStore {
  private readonly alertsSignal = signal<Alert[]>([]);
  readonly alerts = this.alertsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly criticalAlerts = computed(() =>
    this.alerts().filter(alert => alert.severity >= 4)
  );

  readonly recentAlerts = computed(() =>
    this.alerts().slice(0, 10)
  );

  constructor(private readonly alertsApi: AlertsApi) {
    this.loadAlerts();
  }

  addAlert(alert: Omit<Alert, 'id'>): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.alertsApi.createAlert(alert).pipe(retry(2)).subscribe({
      next: createdAlert => {
        this.alertsSignal.update(alerts => [...alerts, createdAlert]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create alert'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateAlert(id: number, updatedAlert: Omit<Alert, 'id'>): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.alertsApi.updateAlert(id, updatedAlert).pipe(retry(2)).subscribe({
      next: alert => {
        this.alertsSignal.update(alerts =>
          alerts.map(a => a.id === alert.id ? alert : a)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update alert'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteAlert(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.alertsApi.deleteAlert(id).pipe(retry(2)).subscribe({
      next: () => {
        this.alertsSignal.update(alerts => alerts.filter(a => a.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete alert'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadAlerts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.alertsApi.getAlerts().pipe(takeUntilDestroyed()).subscribe({
      next: alerts => {
        this.alertsSignal.set(alerts);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load alerts'));
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

  filterBySeverity(minSeverity: number): Alert[] {
    return this.alerts().filter(alert => alert.severity >= minSeverity);
  }

  filterByType(type: string): Alert[] {
    return this.alerts().filter(alert => alert.type === type);
  }
}
