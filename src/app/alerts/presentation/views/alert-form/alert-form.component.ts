import { Component, EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alert } from '../../../domain/model/alert.entity';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-alert-form.component',
  imports: [CommonModule, FormsModule, TranslateModule],
  standalone: true,
  templateUrl: './alert-form.component.html',
  styleUrl: './alert-form.component.css'
})
export class AlertFormComponent {
  @Output() save = new EventEmitter<Omit<Alert, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  model: Omit<Alert, 'id'> = {
    type: '',
    message: '',
    location: '',
    date: '',
    time: '',
    severity: 1
  };

  submitForm() {
    this.save.emit(this.model);
  }

  cancelForm() {
    this.cancel.emit();
  }
}
